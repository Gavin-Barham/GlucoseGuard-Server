// Model DEPENDENCIES
import { DataTypes } from 'sequelize';
import {
	Table,
	Model,
	Column,
	AllowNull,
	HasMany,
	Scopes,
} from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { DATES } from './Dates.js';

// TYPES
import { UserAttributes, UserCreationAttributes } from '../../Types/users.js';

@Scopes(() => ({
	dates: {
		include: [
			{
				model: DATES,
				as: 'dates',
			},
		],
	},
}))
@Table({
	tableName: 'USERs',
	underscored: false,
})
class USERS extends Model<UserAttributes, UserCreationAttributes> {
	@AllowNull(false)
	@Column(DataTypes.STRING)
	email!: string;

	@AllowNull(false)
	@Column(DataTypes.STRING)
	password!: string;

	@AllowNull
	@Column(DataTypes.STRING)
	fname?: string;

	@AllowNull
	@Column(DataTypes.STRING)
	lname?: string;

	@AllowNull
	@Column(DataTypes.INTEGER)
	height?: number;

	@AllowNull
	@Column(DataTypes.INTEGER)
	targetCal?: number;

	@AllowNull
	@Column(DataTypes.STRING)
	refreshToken?: string;

	@HasMany(() => DATES)
	dates: DATES[];
}
DBConnection.addModels([USERS]);

export { USERS };
