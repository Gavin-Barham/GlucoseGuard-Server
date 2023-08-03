// DB DEPENDENCIES
import { DataTypes, Optional } from 'sequelize';
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
import { CalsBurned, Sleep } from '../../Types/models.js';

interface ExerciseAttributes {
	userId: number;
	exerciseId: number;
	weight?: number;
	dailySteps?: number;
	miles?: number;
	calsBurned?: CalsBurned;
	sleep?: Sleep;
}
declare type ExerciseCreationAttributes = Optional<
	ExerciseAttributes,
	'weight' | 'dailySteps' | 'miles' | 'calsBurned' | 'sleep'
>;

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

export { EXERCISE };
