import {
	handleLogin,
	handleRegister,
	handleRefreshToken,
	// handleCheckToken,
} from '../Controllers/authn.js';
import express, { Router } from 'express';
// const validateJTW = require('../Middleware/validateJWT');

const router: Router = express.Router();

// ROUTES TO AUTHENTICATE CLIENTS
router.post('/login', handleLogin);
router.post('/register', handleRegister);
router.get('/refresh', handleRefreshToken);
// router.post('/check-token', validateJTW, handleCheckToken)

export { router as authn };
