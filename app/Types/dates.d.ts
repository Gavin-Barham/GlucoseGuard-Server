// DB DEPENDENCIES
import { Optional } from 'sequelize';
import { MEDICAL } from '../Database/Models/Medical.js';
import { NUTRITION } from '../Database/Models/Nutrition.js';
import { EXERCISE } from '../Database/Models/Exercise.js';
interface DatesAttributes {
	id: number;
	userId: number;
	date: Date;
	medicalId?: number;
	nutritionId?: number;
	exerciseId?: number;
	medical?: MEDICAL;
	nutrition?: NUTRITION;
	exercise?: EXERCISE;
}
interface DatesUpdateAttributes {
	id?: number;
	userId?: number;
	date?: Date;
	medicalId?: number;
	nutritionId?: number;
	exerciseId?: number;
	medical?: MEDICAL;
	nutrition?: NUTRITION;
	exercise?: EXERCISE;
}
declare type DatesCreationAttributes = Optional<
	DatesAttributes,
	| 'medicalId'
	| 'nutritionId'
	| 'exerciseId'
	| 'medical'
	| 'nutrition'
	| 'exercise'
>;

export { DatesAttributes, DatesCreationAttributes, DatesUpdateAttributes };
