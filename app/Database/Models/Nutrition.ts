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
		if (value !== undefined) {
			if (!value.food || !value.calories) {
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
		if (value !== undefined) {
			if (!value.food || !value.calories) {
				throw new Error(
					`Invalid breakfast value: {${value}} is not of type Meal`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	lunch?: Meal;

	@AllowNull
	@Is('dinner', (value) => {
		if (value !== undefined) {
			if (!value.food || !value.calories) {
				throw new Error(
					`Invalid breakfast value: {${value}} is not of type Meal`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	dinner?: Meal;

	@AllowNull
	@Is('snacks', (value) => {
		if (value !== undefined) {
			if (!value[0].food || !value[0].calories) {
				throw new Error(
					`Invalid breakfast value: {${value}} is not of type Meal`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	snacks?: Meal[];
}
DBConnection.addModels([NUTRITION]);

export { NUTRITION, NutritionAttributes };
