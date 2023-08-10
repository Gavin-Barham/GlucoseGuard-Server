// DB DEPENDENCIES
import { Optional } from 'sequelize';

interface NutritionAttributes {
	id: number;
	dateId: number;
	breakfast?: Meal;
	lunch?: Meal;
	dinner?: Meal;
	snacks?: Meal[];
}
interface NutritionUpdateAttributes {
	id?: number;
	dateId?: number;
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
	time: string;
	food: string;
};

export {
	NutritionAttributes,
	NutritionCreationAttributes,
	NutritionUpdateAttributes,
	Meal,
};
