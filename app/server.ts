import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { DBConnection } from './Database/config.js';
import { authnRouters } from './API/Routers/authn.js';
import { usersRouters } from './API/Routers/users.js';
import { datesRouters } from './API/Routers/dates.js';
import { validateJTW } from './API/Middleware/validateJWT.js';

const App: Express = express();
const PORT: number | string = process.env.PORT || 3000;
const HTTPS_PORT: number | string = process.env.HTTPS_PORT || 8443;
const credentials = {
	key: fs.readFileSync('/app/key.pem', 'utf-8'),
	cert: fs.readFileSync('/app/cert.pem', 'utf-8'),
};

App.use(cors());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, Cookie',
	);
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});
App.use(cookieParser());

(async () => {
	try {
		await DBConnection.sync({ alter: true, force: true });
		console.log('Connection has been established successfully.');
	} catch (err) {
		console.error('Unable to connect to the database:', err.message);
	}
})();

App.use('/authn', authnRouters);
App.use('/users', validateJTW, usersRouters);
App.use('/', validateJTW, datesRouters);

const httpServer = http.createServer(App);
const httpsServer = https.createServer(credentials, App);

httpServer.listen(PORT, () => {
	console.log(
		`listening on port: ${PORT}\n    live at: (http://localhost:${PORT})`,
	);
});
httpsServer.listen(HTTPS_PORT, () => {
	console.log(
		`listening on port: ${HTTPS_PORT}\n    live at: (https://localhost:${HTTPS_PORT})`,
	);
});
