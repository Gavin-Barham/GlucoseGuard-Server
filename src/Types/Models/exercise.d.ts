// DB DEPENDENCIES
import { Optional } from 'sequelize';

interface ExerciseAttributes {
	userId: number;
	exerciseId: number;
	weight?: number;
	dailySteps?: number;
	miles?: number;
	calsBurned?: CalsBurned;
	sleep?: Sleep;
}
declare type ExerciseCreationAttributes = Optional<
	ExerciseAttributes,
	'weight' | 'dailySteps' | 'miles' | 'calsBurned' | 'sleep'
>;
declare type CalsBurned = number[];
declare type Sleep = {
	morning: Date;
	night: Date;
};
