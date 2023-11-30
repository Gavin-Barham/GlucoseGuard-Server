// DEPENDENCIES
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserCreationAttributes } from '../../Types/users.js';

// MODELS
import { USERS } from '../../Database/Models/Users.js';

// MIDDLEWARE
import { validateLogin } from '../Utils/validatLoginRequest.js';

// CRUD CONTROLLERS

let SECRET_TOKEN, REFRESH_TOKEN, ACCESS_TOKEN_EXPIRE;

if (process.env.npm_lifecycle_event === 'testing') {
	SECRET_TOKEN = 'TESTING1';
	REFRESH_TOKEN = 'TESTING2';
	ACCESS_TOKEN_EXPIRE = '60s';
} else {
	SECRET_TOKEN = process.env.SECRET_TOKEN;
	REFRESH_TOKEN = process.env.REFRESH_TOKEN;
	ACCESS_TOKEN_EXPIRE = '900s';
}

// REGISTER NEW USER
const handleRegister = async (req: Request, res: Response) => {
	const { email: reqEmail, password: reqPassword } = req.body;

	// CHECK IF USER REQ IS VALID
	if (!reqEmail || !reqPassword) {
		return res
			.status(400)
			.send({ ok: false, message: 'Please enter all fields' });
	} else if (reqPassword.length < 8) {
		return res.status(400).send({
			ok: false,
			message: 'Password must be at least 8 characters',
		});
	}

	// CHECK IF USER ALREADY EXISTS
	const userEmail = await USERS.findOne({ where: { email: reqEmail } });
	if (userEmail)
		return res
			.status(403)
			.send({ ok: false, message: 'Email already exists' });

	// ENCRYPT PASSWORD
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(reqPassword, salt);

	// ADD NEW USER TO DATABASE
	try {
		await USERS.create({
			email: reqEmail,
			password: hashedPassword,
		} as UserCreationAttributes);
		res.status(201).send({
			ok: true,
			message: 'User created successfully',
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ ok: false, message: 'Internal server error' });
	}
};

// VALIDATE LOGIN
const handleLogin = async (req: Request, res: Response) => {
	// VALIDATE USER REQUEST
	const { email: reqEmail, password: reqPassword } = req.body;
	const { error, status, message } = validateLogin(reqEmail, reqPassword);
	if (error) return res.status(status).send({ message: message });

	// CHECK IF USER EXISTS
	const user = await USERS.findOne({ where: { email: reqEmail } });
	if (!user) {
		return res
			.status(400)
			.send({ ok: false, message: 'Credentials are incorrect' });
	}
	// CHECK IF PASSWORD MATCHES
	const validPassword = await bcrypt.compare(
		reqPassword,
		user.dataValues.password,
	);
	if (!validPassword) {
		return res
			.status(400)
			.send({ ok: false, message: 'Credentials are incorrect' });
	}
	// CREATE AND ASSIGN JWT ACCESS TOKEN & REFRESH TOKEN
	const accessToken = jwt.sign({ id: user.id }, SECRET_TOKEN, {
		expiresIn: ACCESS_TOKEN_EXPIRE,
	});
	const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN, {
		expiresIn: '7d',
	});
	try {
		// ADD REFRESH TOKEN TO DATABASE
		await USERS.update(
			{ refreshToken: refreshToken },
			{ where: { id: user.id } },
		);
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.header('auth-token', accessToken).status(200).send({
			ok: true,
			message: 'Success',
			accessToken: accessToken,
			userId: user.id,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({ ok: false, message: 'Internal server error' });
	}
};

const handleRefreshToken = async (req: Request, res: Response) => {
	// PULL REFRESH TOKEN FROM COOKIES
	const cookies = req.cookies;
	if (!cookies?.jwt)
		return res.status(401).send({ ok: false, message: 'Unauthorized' });
	const refreshToken = cookies.jwt;

	try {
		// CHECK THAT USER EXISTS WITH REFRESH TOKEN
		const user = await USERS.findOne({
			where: {
				refreshToken: refreshToken,
			},
		});
		if (!user)
			return res
				.status(401)
				.send({ ok: false, message: 'Could not find user' });

		// VERIFY TOKEN
		const match = jwt.verify(refreshToken, REFRESH_TOKEN);
		if (!match)
			return res.status(403).send({ ok: false, message: 'Forbidden' });

		// CREATE AND ASSIGN JWT ACCESS TOKEN
		const accessToken = jwt.sign({ id: user.id }, SECRET_TOKEN, {
			expiresIn: '900s',
		});
		res.header('auth-token', accessToken).send({
			ok: true,
			message: 'Success',
			accessToken: accessToken,
			userId: user.id,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ ok: false, message: 'Internal server error' });
	}
};

export { handleLogin, handleRegister, handleRefreshToken };
