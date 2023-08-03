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

//  MODELS
import { DATES } from './Dates.js';

// TYPES
import { Meal } from '../../Types/models.js';

interface NutritionAttributes {
	userId: number;
	nutritionId: number;
	breakfast?: Meal;
	lunch?: Meal;
	dinner?: Meal;
	snacks?: Meal[];
}
declare type NutritionCreationAttributes = Optional<
	NutritionAttributes,
	'breakfast' | 'lunch' | 'dinner' | 'snacks'
>;

@Table
class NUTRITION extends Model<
	NutritionAttributes,
	NutritionCreationAttributes
> {
	@PrimaryKey
	@Column(DataTypes.INTEGER)
	nutritionId: number;

	@ForeignKey(() => DATES)
	@Column(DataTypes.INTEGER)
	dateID: number;

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

export { NUTRITION };
