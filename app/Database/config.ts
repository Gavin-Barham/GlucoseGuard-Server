import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import path from 'path';

let POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST;

if (process.env.npm_lifecycle_event === 'testing') {
	POSTGRES_DB = 'TESTING';
	POSTGRES_USER = 'TESTING';
	POSTGRES_PASSWORD = 'TESTING';
	POSTGRES_HOST = 'localhost';
} else {
	POSTGRES_DB = process.env.POSTGRES_DB;
	POSTGRES_USER = process.env.POSTGRES_USER;
	POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
	POSTGRES_HOST = process.env.POSTGRES_HOST;
}

const DBConnection = new Sequelize(
	POSTGRES_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	{
		host: POSTGRES_HOST,
		models: [path.dirname + '/Models'],
		dialect: 'postgres' as Dialect,
	},
);

export { DBConnection };
