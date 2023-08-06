// DB DEPENDENCIES
import { DataTypes } from 'sequelize';
import {
	Model,
	Table,
	Column,
	ForeignKey,
	HasOne,
	AllowNull,
	Is,
} from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { USERS } from './Users.js';
import { MEDICAL } from './Medical.js';
import { NUTRITION } from './Nutrition.js';
import { EXERCISE } from './Exercise.js';

// TYPES
import { DatesAttributes, DatesCreationAttributes } from '../../Types/dates.js';

@Table
class DATES extends Model<DatesAttributes, DatesCreationAttributes> {
	@AllowNull(false)
	@Is('date', (value) => {
		if (typeof value !== typeof new Date()) {
			throw new Error(
				`Invalid date value: {${value}} is not of type Date`,
			);
		}
	})
	@Column(DataTypes.DATE)
	date: Date;

	@AllowNull(false)
	@ForeignKey(() => USERS)
	@Column(DataTypes.INTEGER)
	userId: number;

	@AllowNull
	@ForeignKey(() => MEDICAL)
	@Column(DataTypes.INTEGER)
	medicalId: number;

	@AllowNull
	@ForeignKey(() => NUTRITION)
	@Column(DataTypes.INTEGER)
	nutritionId: number;

	@AllowNull
	@ForeignKey(() => EXERCISE)
	@Column(DataTypes.INTEGER)
	exerciseId: number;

	@HasOne(() => MEDICAL)
	medical: MEDICAL;
	@HasOne(() => NUTRITION)
	nutrition: NUTRITION;
	@HasOne(() => EXERCISE)
	exercise: EXERCISE;
}
DBConnection.addModels([DATES]);

export { DATES };
