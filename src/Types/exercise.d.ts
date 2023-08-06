// DB DEPENDENCIES
import { Optional } from 'sequelize';

interface ExerciseAttributes {
	id: number;
	dateId: number;
	weight?: number;
	dailySteps?: number;
	miles?: number;
	calsBurned?: number;
	sleep?: Sleep;
}
interface ExerciseUpdateAttributes {
	id?: number;
	dateId?: number;
	weight?: number;
	dailySteps?: number;
	miles?: number;
	calsBurned?: number;
	sleep?: Sleep;
}
declare type ExerciseCreationAttributes = Optional<
	ExerciseAttributes,
	'weight' | 'dailySteps' | 'miles' | 'calsBurned' | 'sleep'
>;
declare type Sleep = {
	morning: string;
	night: string;
};

export {
	ExerciseAttributes,
	ExerciseCreationAttributes,
	ExerciseUpdateAttributes,
	Sleep,
};
