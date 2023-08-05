function setNutritionFields(reqObj, dbRowObj) {
	const nutritionFields = {
		breakfast: reqObj.breakfast || dbRowObj.breakfast,
		lunch: reqObj.lunch || dbRowObj.lunch,
		dinner: reqObj.dinner || dbRowObj.dinner,
		snacks: reqObj.snacks || dbRowObj.snacks,
	};
	return nutritionFields;
}

function setMedicalFields(reqObj, dbRowObj) {
	const medicalFields = {
		oxygen: reqObj.oxygen || dbRowObj.oxygen,
		heartRate: reqObj.heartRate || dbRowObj.heartRate,
		bloodPressure: reqObj.bloodPressure || dbRowObj.bloodPressure,
		bloodGlucose: reqObj.bloodGlucose || dbRowObj.bloodGlucose,
		weight: reqObj.weight || dbRowObj.weight,
		medication: reqObj.medication || dbRowObj.medication,
	};
	return medicalFields;
}

function setExerciseFields(reqObj, dbRowObj) {
	const exerciseFields = {
		weight: reqObj.weight || dbRowObj.weight,
		dailySteps: reqObj.dailySteps || dbRowObj.dailySteps,
		miles: reqObj.miles || dbRowObj.miles,
		caloriesBurned: reqObj.caloriesBurned || dbRowObj.caloriesBurned,
		sleep: reqObj.sleep || dbRowObj.sleep,
	};
	return exerciseFields;
}

export { setNutritionFields, setMedicalFields, setExerciseFields };
