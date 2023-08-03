import express, { Router } from 'express';
const router: Router = express.Router();

// IMPORT CONTROLLERS
import { updateUserById, deleteUserById } from '../Controllers/users.js';
// import { createMedical, getMedicalByDate, updateMedical } from '../Controllers/medical.';
// import { createNutrition, getNutritionByDate, updateNutrition } from '../controllers/nutrition';
// import { createExercise, getExerciseByDate, updateExercise } from '../controllers/exercise';
// import {  getAllByDate  } from '../controllers/allTables';

// ROUTES FOR /users
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

// // ROUTES FOR /users/medical
// router.get('/medical/:id', getMedicalByDate);
// router.post('/medical/:id', createMedical);
// router.put('/medical/:id', updateMedical);

// // ROUTES FOR /users/nutrition
// router.get('/nutrition/:id', getNutritionByDate);
// router.post('/nutrition/:id', createNutrition);
// router.put('/nutrition/:id', updateNutrition);

// // ROUTES FOR /users/excercise
// router.get('/exercise/:id', getExerciseByDate);
// router.post('/exercise/:id', createExercise);
// router.put('/exercise/:id', updateExercise);

// router.get('/all/:id/', getAllByDate);

module.exports = router;
