// DB DEPENDENCIES
import { DataTypes } from 'sequelize';
import {
	Model,
	Table,
	Column,
	ForeignKey,
	AllowNull,
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
	@Column(DataTypes.JSON)
	breakfast?: Meal;

	@AllowNull
	@Column(DataTypes.JSON)
	lunch?: Meal;

	@AllowNull
	@Column(DataTypes.JSON)
	dinner?: Meal;

	@AllowNull
	@Column(DataTypes.JSON)
	snacks?: Meal[];
}
DBConnection.addModels([NUTRITION]);

export { NUTRITION, NutritionAttributes };
