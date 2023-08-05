// DB DEPENDENCIES
import { Optional } from 'sequelize';

interface MedicalAttributes {
	id?: number;
	dateId?: number;
	oxygen?: string;
	heartRate?: number[];
	bloodPressure?: BloodPressure;
	bloodGlucose?: number[];
	medication?: Medication;
}

declare type MedicalCreationAttributes = Optional<
	MedicalAttributes,
	'oxygen' | 'heartRate' | 'bloodPressure' | 'bloodGlucose' | 'medication'
>;

declare type Medication = {
	morning: boolean;
	night: boolean;
};
declare type BloodPressureReading = {
	sys: number;
	dias: number;
};
declare type BloodPressure = BloodPressureReading[];

export {
	MedicalAttributes,
	MedicalCreationAttributes,
	Medication,
	BloodPressure,
};
