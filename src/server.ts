import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { DBConnection } from './Database/config.js';
import { authnRouters } from './API/Routers/authn.js';
import { usersRouters } from './API/Routers/users.js';
import { datesRouters } from './API/Routers/dates.js';
import { validateJTW } from './API/Middleware/validateJWT.js';

const App: Express = express();
const PORT: number | string = process.env.PORT || 3030;

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

App.listen(PORT, () => {
	console.log(
		`listening on port: ${PORT}\n    live at: (http://localhost:${PORT})`,
	);
});
