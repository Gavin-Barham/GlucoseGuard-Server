import { ExerciseAttributes } from '../../Types/exercise.js';
import { MedicalAttributes } from '../../Types/medical.js';
import { NutritionAttributes } from '../../Types/nutrition.js';

function setNutritionFields(reqObj, dbRowObj): NutritionAttributes {
	const nutritionFields: NutritionAttributes = {
		breakfast: reqObj.breakfast || dbRowObj.breakfast,
		lunch: reqObj.lunch || dbRowObj.lunch,
		dinner: reqObj.dinner || dbRowObj.dinner,
		snacks: reqObj.snacks || dbRowObj.snacks,
	};
	return nutritionFields;
}

const setMedicalFields = (reqObj, dbRowObj): MedicalAttributes => {
	const medicalFields: MedicalAttributes = {
		oxygen: reqObj.oxygen || dbRowObj.oxygen,
		heartRate: reqObj.heartRate || dbRowObj.heartRate,
		bloodPressure: reqObj.bloodPressure || dbRowObj.bloodPressure,
		bloodGlucose: reqObj.bloodGlucose || dbRowObj.bloodGlucose,
		medication: reqObj.medication || dbRowObj.medication,
	};
	return medicalFields;
};

const setExerciseFields = (reqObj, dbRowObj): ExerciseAttributes => {
	const exerciseFields: ExerciseAttributes = {
		weight: reqObj.weight || dbRowObj.weight,
		dailySteps: reqObj.dailySteps || dbRowObj.dailySteps,
		miles: reqObj.miles || dbRowObj.miles,
		calsBurned: reqObj.calsBurned || dbRowObj.calsBurned,
		sleep: reqObj.sleep || dbRowObj.sleep,
	};
	return exerciseFields;
};

export { setNutritionFields, setMedicalFields, setExerciseFields };
