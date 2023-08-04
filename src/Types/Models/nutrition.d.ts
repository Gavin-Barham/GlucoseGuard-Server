// DB DEPENDENCIES
import { Optional } from 'sequelize';

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

declare type Meal = {
	cal: number;
	time: number;
	food: string;
};

export { NutritionAttributes, NutritionCreationAttributes, Meal };
