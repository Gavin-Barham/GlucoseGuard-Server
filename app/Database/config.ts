import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import path from 'path';

const DBConnection = new Sequelize(
	process.env.POSTGRES_DB || 'TESTING',
	process.env.POSTGRES_USER || 'TESTING',
	process.env.POSTGRES_PASSWORD || 'TESTING',
	{
		host: process.env.POSTGRES_HOST || '127.0.0.1',
		models: [path.dirname + '/Models'],
		dialect: 'postgres' as Dialect,
	},
);

export { DBConnection };
