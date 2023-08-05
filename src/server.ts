import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import home from './API/Routers/homeRouter.js';
import { DBConnection } from './Database/config.js';
import { authn } from './API/Routers/authn.js';
import { users } from './API/Routers/users.js';
import { dates } from './API/Routers/dates.js';

const App: Express = express();
const PORT: number | string = process.env.PORT || 3030;

App.use(cors());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use((req, res, next) => {
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

App.use('/', home);
App.use('/authn', authn);
App.use('/users', users);
App.use('/dates', dates);
// TODO:
// App.use('/medical', medical);
// App.use('/nutrition', nutrition);
// App.use('/exercise', exercise);

App.listen(PORT, () => {
	console.log(
		`listening on port: ${PORT}\n    live at: (http://localhost:${PORT})`,
	);
});
