import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import path from 'path';

const DBConnection = new Sequelize(
	process.env.POSTGRES_DB || '',
	process.env.POSTGRES_USER || '',
	process.env.POSTGRES_PASSWORD || '',
	{
		host: process.env.POSTGRES_HOST || '',
		models: [path.dirname + '/Models'],
		dialect: 'postgres' as Dialect,
	},
);

export { DBConnection };
