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
	@Column(DataTypes.INTEGER)
	dateId: number;

	@Column(DataTypes.STRING)
	oxygen?: string;

	@Column(DataTypes.INTEGER)
	heartRate?: number;

	@Is('BloodPressure', (value) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const bloodPressure: BloodPressure = [{ sys: 1, dias: 1 }];
		if (value !== undefined) {
			if (!value.sys || !value.dias) {
				throw new Error(
					`Invalid value:${value} not of type BloodPressure`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	bloodPressure?: BloodPressure;

	@Is('bloodGlucose', (value) => {
		const numArr: number[] = [1, 2.3];
		if (value !== undefined) {
			if (typeof value !== typeof numArr) {
				throw new Error(
					`Invalid bloodGlucose value: {${value}} is not of type number[]`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	bloodGlucose?: number[];

	@Is('medication', (value) => {
		if (value !== undefined) {
			if (!value.morning && !value.night) {
				throw new Error(
					`Invalid medication value: {${value}} is not of type Medication`,
				);
			}
		}
	})
	@Column(DataTypes.JSON)
	medication?: Medication;
}

DBConnection.addModels([MEDICAL]);

export { MEDICAL, MedicalAttributes };
