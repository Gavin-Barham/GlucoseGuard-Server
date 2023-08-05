// Model DEPENDENCIES
import { DataTypes } from 'sequelize';
import { Table, Model, Column, AllowNull, HasMany } from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { DATES } from './Dates.js';

// TYPES
import { UserAttributes, UserCreationAttributes } from '../../Types/users.js';

@Table
class USERS extends Model<UserAttributes, UserCreationAttributes> {
	@AllowNull(false)
	@Column(DataTypes.STRING)
	email: string;

	@AllowNull(false)
	@Column(DataTypes.STRING)
	password: string;

	@AllowNull
	@Column(DataTypes.STRING)
	fname: string;

	@AllowNull
	@Column(DataTypes.STRING)
	lname: string;

	@AllowNull
	@Column(DataTypes.INTEGER)
	height: number;

	@AllowNull
	@Column(DataTypes.STRING)
	targetCal: string;

	@AllowNull
	@Column(DataTypes.STRING)
	refreshToken: string;

	@HasMany(() => DATES)
	dates: DATES[];
}
DBConnection.addModels([USERS]);

export { USERS };
