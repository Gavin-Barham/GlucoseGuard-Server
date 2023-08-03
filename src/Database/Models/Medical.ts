// DB DEPENDENCIES
import { DataTypes, Optional } from 'sequelize';
import {
	Model,
	Table,
	Column,
	PrimaryKey,
	ForeignKey,
} from 'sequelize-typescript';
import { DBConnection } from '../config.js';

// MODELS
import { DATES } from './Dates.js';

// TYPES
import { Medication, BloodPressure } from '../../Types/models.js';

interface MedicalAttributes {
	userId: number;
	dateId: number;
	medicalId: number;
	oxygen?: string;
	heartRate?: number[];
	bloodPressure?: BloodPressure;
	bloodGlucose?: number[];
	medication?: Medication;
}

declare type MedicalCreationAttributes = Optional<
	MedicalAttributes,
	| 'userId'
	| 'oxygen'
	| 'heartRate'
	| 'bloodPressure'
	| 'bloodGlucose'
	| 'medication'
>;

@Table
class MEDICAL extends Model<MedicalAttributes, MedicalCreationAttributes> {
	@PrimaryKey
	@Column(DataTypes.INTEGER)
	medicalId: number;

	@ForeignKey(() => DATES)
	@Column(DataTypes.INTEGER)
	dateId: number;

	@Column(DataTypes.STRING)
	oxygen?: string;

	@Column(DataTypes.INTEGER)
	heart_rate?: number;

	@Column(DataTypes.JSON)
	blood_pressure?: BloodPressure;

	@Column(DataTypes.JSON)
	blood_glucose?: number[];

	@Column(DataTypes.JSON)
	medication?: Medication;
}

DBConnection.addModels([MEDICAL]);

export { MEDICAL };
