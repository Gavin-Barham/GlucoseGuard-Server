// Model DEPENDENCIES
import { DataTypes } from 'sequelize';
import {
	Table,
	Model,
	Column,
	AllowNull,
	HasMany,
	Is,
} from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { DATES } from './Dates.js';

// TYPES
import { UserAttributes, UserCreationAttributes } from '../../Types/users.js';

@Table
class USERS extends Model<UserAttributes, UserCreationAttributes> {
	@AllowNull(false)
	@Is('email', (value) => {
		if (typeof value !== 'string' || !value.includes('@')) {
			throw new Error(
				`Invalid email value: {${value}} is not of type sting or does not contain @`,
			);
		}
	})
	@Column(DataTypes.STRING)
	email: string;

	@AllowNull(false)
	@Is('password', (value) => {
		if (typeof value !== 'string') {
			throw new Error(
				`Invalid password value: {${value}} is not of type sting`,
			);
		}
	})
	@Column(DataTypes.STRING)
	password: string;

	@AllowNull
	@Is('fname', (value) => {
		if (typeof value !== 'string') {
			throw new Error(
				`Invalid fname value: {${value}} is not of type sting`,
			);
		}
	})
	@Column(DataTypes.STRING)
	fname: string;

	@AllowNull
	@Is('lname', (value) => {
		if (typeof value !== 'string') {
			throw new Error(
				`Invalid lname value: {${value}} is not of type sting`,
			);
		}
	})
	@Column(DataTypes.STRING)
	lname: string;

	@AllowNull
	@Is('height', (value) => {
		if (typeof value !== 'number') {
			throw new Error(
				`Invalid height value: {${value}} is not of type number`,
			);
		}
	})
	@Column(DataTypes.INTEGER)
	height: number;

	@AllowNull
	@Is('targetCal', (value) => {
		if (typeof value !== 'string') {
			throw new Error(
				`Invalid targetCal value: {${value}} is not of type sting`,
			);
		}
	})
	@Column(DataTypes.INTEGER)
	targetCal: number;

	@AllowNull
	@Is('refreshToken', (value) => {
		if (typeof value !== 'string') {
			throw new Error(
				`Invalid refreshToken value: {${value}} is not of type sting`,
			);
		}
	})
	@Column(DataTypes.STRING)
	refreshToken: string;

	@HasMany(() => DATES)
	dates: DATES[];
}
DBConnection.addModels([USERS]);

export { USERS };
