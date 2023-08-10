import { Request, Response } from 'express';
// MODELS
import { USERS } from '../../Database/Models/Users.js';

// CRUD CONTROLLERS //

// GET USER
const getUserById = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const user = await USERS.findByPk(id, {
			attributes: {
				exclude: [
					'email',
					'password',
					'refreshToken',
					'dates',
					'updatedAt',
					'createdAt',
				],
			},
		});
		if (!user) {
			return res
				.status(404)
				.json({ ok: false, message: 'User not found' });
		}
		return res
			.status(200)
			.json({ ok: true, message: 'Success', user: user });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: err.message,
		});
	}
};

// UPDATE USER
const updateUserById = async (req: Request, res: Response) => {
	const id = req.params.id;
	const updatedUser = req.body;
	try {
		const user = await USERS.findByPk(id);
		if (!user) {
			return res
				.status(404)
				.json({ ok: false, message: 'user not found' });
		}
		const updatedUserRow = await USERS.update(
			{
				fname: updatedUser.fname || user.fname,
				lname: updatedUser.lname || user.lname,
				email: updatedUser.email || user.email,
				password: updatedUser.password || user.password,
				height: updatedUser.height || user.height,
				targetCal: updatedUser.targetCal || user.targetCal,
			},
			{
				where: {
					id: id,
				},
			},
		);
		if (!updatedUserRow) {
			res.status(500).json({
				ok: false,
				message: 'unable to update user',
			});
		} else {
			res.status(200).json({
				ok: true,
				message: 'user updated successfully',
			});
		}
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: err.message,
		});
	}
};

// DELETE USER
const deleteUserById = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const user = await USERS.findByPk(id);
		if (!user) {
			return res
				.status(404)
				.json({ ok: false, message: 'user not found' });
		}
		try {
			await user.destroy();

			return res.status(200).json({
				message: 'user deleted successfully',
			});
		} catch (err) {
			console.error(err.message);
			return res.status(500).send({
				ok: false,
				message: 'Error occured with database (destroy user)',
			});
		}
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({
			ok: false,
			message: err.message,
		});
	}
};

export { getUserById, updateUserById, deleteUserById };
