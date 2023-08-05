import {
	handleLogin,
	handleRegister,
	handleRefreshToken,
} from '../Controllers/authn.js';
import express, { Router } from 'express';

const router: Router = express.Router();

// ROUTES TO AUTHENTICATE CLIENTS
router.post('/login', handleLogin);
router.post('/register', handleRegister);
router.get('/refresh', handleRefreshToken);

export { router as authnRouters };
