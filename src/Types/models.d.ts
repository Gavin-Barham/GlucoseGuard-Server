declare type Medication = {
	morning: boolean;
	night: boolean;
};
declare type BloodPressureReading = {
	sys: number;
	dias: number;
};
declare type BloodPressure = BloodPressureReading[];
declare type Meal = {
	cal: number;
	time: number;
	food: string;
};
declare type CalsBurned = number[];
declare type Sleep = {
	morning: Date;
	night: Date;
};

export { Medication, BloodPressure, Meal, CalsBurned, Sleep };
