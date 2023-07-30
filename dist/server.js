import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import home from './Routers/homeRouter.js';
import { DATABASE as DB } from './Database/DATABASE.js';
const App = express();
const PORT = 3030;
App.use(cors());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
App.use(cookieParser());
(async () => {
    try {
        await DB.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    ;
})();
App.use("/", home);
App.listen(PORT, () => {
    console.log(`listening on port: ${PORT}\n    live at: (http://localhost:${PORT})`);
});
//# sourceMappingURL=server.js.map