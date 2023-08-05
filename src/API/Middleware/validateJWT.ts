import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const validateJTW = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	// CHECK IF AUTHORIZATION HEADER EXISTS
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(403).send('Unauthorized: token is invalid or empty');
	}
	const token = authHeader.substring(7);
	let payload;

	// CHECK IF TOKEN IS VALID
	try {
		payload = jwt.verify(token, process.env.SECRET_TOKEN);
	} catch (error) {
		return res.status(403).send('Unauthorized: token does not match');
	}

	// CHECK IF TOKEN IS EXPIRED
	const now = Date.now() / 1000; // Convert to seconds
	if (!payload.exp || payload.exp <= now) {
		return res.status(403).send('Unauthorized: token has expired');
	}

	req.body.user = payload;

	next();
};

export { validateJTW };
