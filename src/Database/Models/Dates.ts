// DB DEPENDENCIES
import { DataTypes, Optional } from 'sequelize';
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

interface DatesAttributes {
	userId: number;
	dateId: number;
	date: Date;
	medicalId: number;
	nutritionId: number;
	exerciseId: number;
}
declare type DatesCreationAttributes = Optional<
	DatesAttributes,
	'userId' | 'medicalId' | 'nutritionId' | 'exerciseId'
>;

@Table
class DATES extends Model<DatesAttributes, DatesCreationAttributes> {
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

export { DATES };
