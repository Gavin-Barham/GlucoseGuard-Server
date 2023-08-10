import express, { Router } from 'express';
import {
	handleCreateDay,
	handleGetAllSingleDay,
	handleGetAllDayRange,
	handleGetMedical,
	handleGetNutrition,
	handleGetExercise,
	handleUpdateMedical,
	handleUpdateNutrition,
	handleUpdateExercise,
} from '../Controllers/dates.js';

const router: Router = express.Router();

// ROUTES TO AUTHENTICATE CLIENTS
router.post('/:id/day', handleCreateDay);
router.get('/:id/day', handleGetAllSingleDay);
router.get('/:id/range', handleGetAllDayRange);
router.get('/:id/medical', handleGetMedical);
router.get('/:id/nutrition', handleGetNutrition);
router.get('/:id/exercise', handleGetExercise);
router.put('/:id/medical', handleUpdateMedical);
router.put('/:id/nutrition', handleUpdateNutrition);
router.put('/:id/exercise', handleUpdateExercise);

export { router as datesRouters };
