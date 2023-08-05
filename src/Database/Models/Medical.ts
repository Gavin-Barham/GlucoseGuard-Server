// DB DEPENDENCIES
import { DataTypes } from 'sequelize';
import { Model, Table, Column, ForeignKey } from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { DATES } from './Dates.js';

// TYPES
import {
	MedicalAttributes,
	MedicalCreationAttributes,
	Medication,
	BloodPressure,
} from '../../Types/Models/medical.js';

@Table
class MEDICAL extends Model<MedicalAttributes, MedicalCreationAttributes> {
	@ForeignKey(() => DATES)
	@Column(DataTypes.INTEGER)
	dateId: number;

	@Column(DataTypes.STRING)
	oxygen?: string;

	@Column(DataTypes.INTEGER)
	heartRate?: number;

	@Column(DataTypes.JSON)
	bloodPressure?: BloodPressure;

	@Column(DataTypes.JSON)
	bloodGlucose?: number[];

	@Column(DataTypes.JSON)
	medication?: Medication;
}

DBConnection.addModels([MEDICAL]);

export { MEDICAL, MedicalAttributes };
