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
import { validateJTW } from '../Middleware/validateJWT.js';

const router: Router = express.Router();

// ROUTES TO AUTHENTICATE CLIENTS
router.post('/:id', validateJTW, handleCreateDay);
router.get('/:id', validateJTW, handleGetAllSingleDay);
router.get('/:id/range', validateJTW, handleGetAllDayRange);
router.get('/:id/medical', validateJTW, handleGetMedical);
router.get('/:id/nutrition', validateJTW, handleGetNutrition);
router.get('/:id/exercise', validateJTW, handleGetExercise);
router.put('/:id/medical', validateJTW, handleUpdateMedical);
router.put('/:id/nutrition', validateJTW, handleUpdateNutrition);
router.put('/:id/exercise', validateJTW, handleUpdateExercise);

export { router as dates };
