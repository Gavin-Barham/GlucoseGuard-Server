import express, { Router } from 'express';

const router: Router = express.Router();

// IMPORT CONTROLLERS
import {
	getUserById,
	updateUserById,
	deleteUserById,
} from '../Controllers/users.js';

// ROUTES FOR /users
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export { router as usersRouters };
