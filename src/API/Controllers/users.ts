import { Request, Response } from 'express';
// MODELS
import { USERS } from '../../Database/Models/Users.js';

// CRUD CONTROLLERS //

// UPDATE USER
const updateUserById = async (req: Request, res: Response) => {
	const id = req.params.id;
	const updatedUser = req.body;
	const user = await USERS.findByPk(id);
	if (!user) {
		return res.status(404).json({ ok: false, message: 'user not found' });
	}
	const updatedUserRow = await USERS.update(
		{
			fname: updatedUser.username || user.fname,
			lname: updatedUser.username || user.lname,
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
		res.status(500).json({ ok: false, message: 'unable to update user' });
	} else {
		res.status(200).json({
			ok: true,
			message: 'user updated successfully',
			rows: updatedUserRow,
		});
	}
};

// DELETE USER
const deleteUserById = async (req: Request, res: Response) => {
	const id = req.params.id;
	const user = await USERS.findByPk(id);
	if (!user) {
		return res.status(404).json({ ok: false, message: 'user not found' });
	}

	await user.destroy();

	res.status(200).json({
		message: 'user deleted successfully',
		rows: user,
	});
};

export { updateUserById, deleteUserById };
