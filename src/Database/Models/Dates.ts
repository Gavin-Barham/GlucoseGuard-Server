// DB DEPENDENCIES
import { DataTypes, InferCreationAttributes } from 'sequelize';
import {
	Model,
	Table,
	Column,
	ForeignKey,
	PrimaryKey,
	HasOne,
} from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { USERS } from './Users.js';
import { MEDICAL } from './Medical.js';
import { NUTRITION } from './Nutrition.js';
import { EXERCISE } from './Exercise.js';

// TYPES
import { DatesAttributes } from '../../Types/Models/dates.js';

@Table
class DATES extends Model<DatesAttributes, InferCreationAttributes<DATES>> {
	@PrimaryKey
	@Column(DataTypes.INTEGER)
	dateId: number;

	@Column(DataTypes.DATE)
	date: number;

	@ForeignKey(() => USERS)
	@Column(DataTypes.INTEGER)
	userId: number;

	@ForeignKey(() => MEDICAL)
	medicalId: number;

	@ForeignKey(() => NUTRITION)
	nutritionId: number;

	@ForeignKey(() => EXERCISE)
	exerciseId: number;

	@HasOne(() => MEDICAL)
	medical: MEDICAL;
	@HasOne(() => NUTRITION)
	nutrition: NUTRITION;
	@HasOne(() => EXERCISE)
	exercise: EXERCISE;
}
DBConnection.addModels([DATES]);

export { DATES, DatesAttributes };
