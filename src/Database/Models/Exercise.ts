// DB DEPENDENCIES
import { DataTypes } from 'sequelize';
import {
	Model,
	Table,
	Column,
	PrimaryKey,
	ForeignKey,
	AllowNull,
} from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { DATES } from './Dates.js';

// TYPES
import {
	ExerciseAttributes,
	ExerciseCreationAttributes,
	CalsBurned,
	Sleep,
} from '../../Types/Models/exercise.js';

@Table
class EXERCISE extends Model<ExerciseAttributes, ExerciseCreationAttributes> {
	@PrimaryKey
	@Column(DataTypes.INTEGER)
	exerciseId: number;

	@ForeignKey(() => DATES)
	@Column(DataTypes.INTEGER)
	dateId: number;

	@AllowNull
	@Column(DataTypes.INTEGER)
	weight?: number;

	@AllowNull
	@Column(DataTypes.INTEGER)
	daily_steps?: number;

	@AllowNull
	@Column(DataTypes.INTEGER)
	miles?: number;

	@AllowNull
	@Column(DataTypes.JSON)
	calsBurned?: CalsBurned;

	@AllowNull
	@Column(DataTypes.JSON)
	sleep?: Sleep;
}
DBConnection.addModels([EXERCISE]);

export { EXERCISE, ExerciseAttributes };
