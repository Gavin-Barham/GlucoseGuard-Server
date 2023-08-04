// DB DEPENDENCIES
import { DataTypes } from 'sequelize';
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
import {
	MedicalAttributes,
	MedicalCreationAttributes,
	Medication,
	BloodPressure,
} from '../../Types/Models/medical.js';

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

export { MEDICAL, MedicalAttributes };
