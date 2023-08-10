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
	@Column(DataTypes.INTEGER)
	dateId: number;

	@AllowNull
	@Column(DataTypes.INTEGER)
	weight?: number;

	@AllowNull
	@Column(DataTypes.INTEGER)
	dailySteps?: number;

	@AllowNull
	@Column(DataTypes.INTEGER)
	miles?: number;

	@AllowNull
	@Column(DataTypes.INTEGER)
	calsBurned?: number;

	@AllowNull
	@Is('sleep', (value) => {
		if (value !== undefined) {
			if (!value.wake && !value.sleep) {
				throw new Error(
					`Invalid sleep value: {${value}} is not of type Sleep`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	sleep?: Sleep;
}
DBConnection.addModels([EXERCISE]);

export { EXERCISE, ExerciseAttributes };
