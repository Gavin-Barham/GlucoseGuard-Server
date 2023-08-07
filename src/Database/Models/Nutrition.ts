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

//  MODELS
import { DATES } from './Dates.js';

// TYPES
import {
	NutritionAttributes,
	NutritionCreationAttributes,
	Meal,
} from '../../Types/nutrition.js';

@Table
class NUTRITION extends Model<
	NutritionAttributes,
	NutritionCreationAttributes
> {
	@ForeignKey(() => DATES)
	@Column(DataTypes.INTEGER)
	dateId: number;

	@AllowNull
	@Is('breakfast', (value) => {
		const meal: Meal = { cal: 1, time: '00:00:00', food: 'burger' };
		if (value !== undefined) {
			if (typeof value !== typeof meal) {
				throw new Error(
					`Invalid breakfast value: {${value}} is not of type Meal`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	breakfast?: Meal;

	@AllowNull
	@Is('lunch', (value) => {
		const meal: Meal = { cal: 1, time: '00:00:00', food: 'burger' };
		if (value !== undefined) {
			if (typeof value !== typeof meal) {
				throw new Error(
					`Invalid lunch value: {${value}} is not of type Meal`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	lunch?: Meal;

	@AllowNull
	@Is('dinner', (value) => {
		const meal: Meal = { cal: 1, time: '00:00:00', food: 'burger' };
		if (value !== undefined) {
			if (typeof value !== typeof meal) {
				throw new Error(
					`Invalid dinner value: {${value}} is not of type Meal`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	dinner?: Meal;

	@AllowNull
	@Is('snacks', (value) => {
		const meal: Meal = { cal: 1, time: '00:00:00', food: 'burger' };
		const mealArr: Meal[] = [meal, meal, meal];
		if (value !== undefined) {
			if (typeof value !== typeof mealArr) {
				throw new Error(
					`Invalid snacks value: {${value}} is not of type Meal[]`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	snacks?: Meal[];
}
DBConnection.addModels([NUTRITION]);

export { NUTRITION, NutritionAttributes };
