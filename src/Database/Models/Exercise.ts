// DB DEPENDENCIES
import { DataTypes } from 'sequelize';
import {
	Model,
	Table,
	Column,
	ForeignKey,
	AllowNull,
	Is,
} from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { DATES } from './Dates.js';

// TYPES
import {
	ExerciseAttributes,
	ExerciseCreationAttributes,
	Sleep,
} from '../../Types/exercise.js';

@Table
class EXERCISE extends Model<ExerciseAttributes, ExerciseCreationAttributes> {
	@ForeignKey(() => DATES)
	@Is('dateId', (value) => {
		if (typeof value !== 'number') {
			throw new Error(
				`Invalid dateId value: {${value}} is not of type number`,
			);
		}
	})
	@Column(DataTypes.INTEGER)
	dateId: number;

	@AllowNull
	@Is('weight', (value) => {
		if (typeof value !== 'number') {
			throw new Error(
				`Invalid weight value: {${value}} is not of type number`,
			);
		}
	})
	@Column(DataTypes.INTEGER)
	weight?: number;

	@AllowNull
	@Is('dailySteps', (value) => {
		if (typeof value !== 'number') {
			throw new Error(
				`Invalid dailySteps value: {${value}} is not of type number`,
			);
		}
	})
	@Column(DataTypes.INTEGER)
	dailySteps?: number;

	@AllowNull
	@Is('miles', (value) => {
		if (typeof value !== 'number') {
			throw new Error(
				`Invalid miles value: {${value}} is not of type number`,
			);
		}
	})
	@Column(DataTypes.INTEGER)
	miles?: number;

	@AllowNull
	@Is('calsBurned', (value) => {
		if (typeof value !== 'number') {
			throw new Error(
				`Invalid calsBurned value: {${value}} is not of type number`,
			);
		}
	})
	@Column(DataTypes.INTEGER)
	calsBurned?: number;

	@AllowNull
	@Is('sleep', (value) => {
		const sleep: Sleep = { morning: '08:30', night: '09:30' };
		if (typeof value !== typeof sleep) {
			throw new Error(
				`Invalid sleep value: {${value}} is not of type Sleep`,
			);
		}
	})
	@Column(DataTypes.JSON)
	sleep?: Sleep;
}
DBConnection.addModels([EXERCISE]);

export { EXERCISE, ExerciseAttributes };
