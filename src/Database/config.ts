import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import path from 'path';

const DBConnection = new Sequelize(
	process.env.DB || '',
	process.env.DB_USER || '',
	process.env.DB_PASS || '',
	{
		host: process.env.DB_HOST || '',
		models: [path.dirname + '/Models'],
		dialect: 'postgres' as Dialect,
	},
);

export { DBConnection };
