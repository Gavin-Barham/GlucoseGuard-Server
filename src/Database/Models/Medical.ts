// DB DEPENDENCIES
import { DataTypes } from 'sequelize';
import { Model, Table, Column, ForeignKey, Is } from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { DATES } from './Dates.js';

// TYPES
import {
	MedicalAttributes,
	MedicalCreationAttributes,
	Medication,
	BloodPressure,
} from '../../Types/medical.js';

@Table
class MEDICAL extends Model<MedicalAttributes, MedicalCreationAttributes> {
	@ForeignKey(() => DATES)
	@Is('dateId', (value) => {
		if (typeof value !== 'number') {
			throw new Error(
				`Invalid dateId value: {${value}} is not of type number`,
			);
		}
	})
	@Column(DataTypes.INTEGER)
	dateId: number;

	@Is('oxygen', (value) => {
		if (typeof value !== 'string') {
			throw new Error(
				`Invalid oxygen value: {${value}} is not of type string`,
			);
		}
	})
	@Column(DataTypes.STRING)
	oxygen?: string;

	@Is('heartRate', (value) => {
		if (typeof value !== 'number') {
			throw new Error(
				`Invalid heartRate value: {${value}} is not of type number`,
			);
		}
	})
	@Column(DataTypes.INTEGER)
	heartRate?: number;

	@Is('BloodPressure', (value) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const bloodPressure: BloodPressure = [{ sys: 1, dias: 1 }];
		if (typeof bloodPressure !== typeof value) {
			throw new Error(`Invalid value:${value} not of type BloodPressure`);
		}
	})
	@Column(DataTypes.JSON)
	bloodPressure?: BloodPressure;

	@Is('bloodGlucose', (value) => {
		const numArr: number[] = [1, 2.3];
		if (typeof value !== typeof numArr) {
			throw new Error(
				`Invalid bloodGlucose value: {${value}} is not of type number[]`,
			);
		}
	})
	@Column(DataTypes.JSON)
	bloodGlucose?: number[];

	@Is('medication', (value) => {
		const medication: Medication = { morning: true, night: false };
		if (typeof value !== typeof medication) {
			throw new Error(
				`Invalid medication value: {${value}} is not of type Medication`,
			);
		}
	})
	@Column(DataTypes.JSON)
	medication?: Medication;
}

DBConnection.addModels([MEDICAL]);

export { MEDICAL, MedicalAttributes };
