import { Optional } from 'sequelize';

interface UserAttributes {
	id: number;
	email: string;
	password: string;
	fname?: string;
	lname?: string;
	height?: number;
	targetCal?: number;
	refreshToken?: string;
}
declare type UserCreationAttributes = Optional<
	UserAttributes,
	'fname' | 'lname' | 'height' | 'targetCal' | 'refreshToken'
>;

export { UserAttributes, UserCreationAttributes };
