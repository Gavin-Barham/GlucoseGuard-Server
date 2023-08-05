import { Request, Response } from 'express';
import { Op } from 'sequelize';
// MODELS
import { DATES } from '../../Database/Models/Dates.js';
import { USERS } from '../../Database/Models/Users.js';
import { MEDICAL } from '../../Database/Models/Medical.js';
import { NUTRITION } from '../../Database/Models/Nutrition.js';
import { EXERCISE } from '../../Database/Models/Exercise.js';
import { DatesCreationAttributes } from '../../Types/Models/dates.js';

import {
	setMedicalFields,
	setNutritionFields,
	setExerciseFields,
} from '../Utils/setUpdateFields.js';

// CRUD CONTROLLERS //

// Create new day => medical, nutrition, and exercise entries to associate ids
const handleCreateDay = async (req: Request, res: Response) => {
	try {
		const id: number = parseInt(req.params.id);
		const date = req.body.date as string;
		if (!date) {
			return res.status(404).send({ ok: false, message: 'Invalid date' });
		}
		const creationDate = new Date(date);
		const user = await USERS.findByPk(id);
		const day = await DATES.create({
			userId: user.id,
			date: creationDate,
		} as DatesCreationAttributes);
		const medical = await MEDICAL.create({
			dateId: day.dataValues.id,
		});
		const nutrition = await NUTRITION.create({
			dateId: day.dataValues.id,
		});
		const exercise = await EXERCISE.create({
			dateId: day.dataValues.id,
		});
		await DATES.update(
			{
				medicalId: medical.dataValues.id,
				nutritionId: nutrition.dataValues.id,
				exerciseId: exercise.dataValues.id,
			},
			{
				where: {
					id: day.dataValues.id,
				},
			},
		);
		return res.status(200).send({ ok: true, message: 'Success' });
	} catch (err) {
		console.error(err);
		return res.status(500).send({
			ok: false,
			message: 'Error occured with Database (create day)',
		});
	}
};

// get day, medical, nutrition, exercise with userId and date
const handleGetAllSingleDay = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const date = req.query.date as string;
		const searchDate = new Date(date);
		const dateID = await DATES.findOne({
			where: { userId: id, date: searchDate },
		});
		if (!dateID)
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		const day = await DATES.findOne({
			where: {
				userId: id,
				date: searchDate,
			},
			include: [
				{
					model: MEDICAL,
					where: {
						dateId: dateID.dataValues.id,
					},
					attributes: {
						exclude: ['id', 'createdAt', 'updatedAt', 'dateId'],
					},
				},
				{
					model: NUTRITION,
					where: {
						dateId: dateID.dataValues.id,
					},
					attributes: {
						exclude: ['id', 'createdAt', 'updatedAt', 'dateId'],
					},
				},
				{
					model: EXERCISE,
					where: {
						dateId: dateID.dataValues.id,
					},
					attributes: {
						exclude: ['id', 'createdAt', 'updatedAt', 'dateId'],
					},
				},
			],
			attributes: {
				exclude: [
					'id',
					'medicalId',
					'nutritionId',
					'exerciseId',
					'userId',
					'createdAt',
					'updatedAt',
				],
			},
		});
		if (!day) {
			return res
				.status(404)
				.send({ ok: false, message: 'Could not find day' });
		}
		return res.status(200).send({ ok: true, message: 'Success', day: day });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: 'Error occured with Database(get single day)',
		});
	}
};

const handleGetAllDayRange = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const start = req.query.start as string;
		const end = req.query.end as string;
		const startDate = new Date(start);
		const endDate = new Date(end);
		const dateIds = await DATES.findAll({
			where: {
				date: { [Op.between]: [startDate, endDate] },
				userId: id,
			},
		});
		if (!dateIds) {
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		}
		const idRange = dateIds.map((day) => {
			return day.dataValues.id;
		});
		const days = await DATES.findAll({
			where: {
				date: { [Op.between]: [startDate, endDate] },
				userId: id,
			},
			include: [
				{
					model: MEDICAL,
					where: {
						dateId: idRange,
					},
					attributes: {
						exclude: ['id', 'createdAt', 'updatedAt', 'dateId'],
					},
				},
				{
					model: NUTRITION,
					where: {
						dateId: idRange,
					},
					attributes: {
						exclude: ['id', 'createdAt', 'updatedAt', 'dateId'],
					},
				},
				{
					model: EXERCISE,
					where: {
						dateId: idRange,
					},
					attributes: {
						exclude: ['id', 'createdAt', 'updatedAt', 'dateId'],
					},
				},
			],
			attributes: {
				exclude: [
					'id',
					'medicalId',
					'nutritionId',
					'exerciseId',
					'userId',
					'createdAt',
					'updatedAt',
				],
			},
		});
		if (!days) {
			return res
				.status(404)
				.send({ ok: false, message: 'Could not find day' });
		}
		return res
			.status(200)
			.send({ ok: true, message: 'Success', days: days });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: 'Error occured with Database(get day range)',
		});
	}
};
const handleGetMedical = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const date = req.query.date as string;
		const searchDate = new Date(date);
		const dateID = await DATES.findOne({
			where: { userId: id, date: searchDate },
		});
		if (!dateID)
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		const day = await DATES.findOne({
			where: {
				userId: id,
				date: searchDate,
			},
			include: {
				model: MEDICAL,
				where: {
					dateId: dateID.dataValues.id,
				},
				attributes: {
					exclude: ['id', 'createdAt', 'updatedAt', 'dateId'],
				},
			},
			attributes: {
				exclude: [
					'id',
					'medicalId',
					'nutritionId',
					'exerciseId',
					'userId',
					'createdAt',
					'updatedAt',
				],
			},
		});
		if (!day) {
			return res
				.status(404)
				.send({ ok: false, message: 'Could not find day' });
		}
		return res.status(200).send({ ok: true, message: 'Success', day: day });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: 'Error occured with Database(get single day)',
		});
	}
};
const handleGetNutrition = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const date = req.query.date as string;
		const searchDate = new Date(date);
		const dateID = await DATES.findOne({
			where: { userId: id, date: searchDate },
		});
		if (!dateID)
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		const day = await DATES.findOne({
			where: {
				userId: id,
				date: searchDate,
			},
			include: {
				model: NUTRITION,
				where: {
					dateId: dateID.dataValues.id,
				},
				attributes: {
					exclude: ['id', 'createdAt', 'updatedAt', 'dateId'],
				},
			},
			attributes: {
				exclude: [
					'id',
					'medicalId',
					'nutritionId',
					'exerciseId',
					'userId',
					'createdAt',
					'updatedAt',
				],
			},
		});
		if (!day) {
			return res
				.status(404)
				.send({ ok: false, message: 'Could not find day' });
		}
		return res.status(200).send({ ok: true, message: 'Success', day: day });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: 'Error occured with Database(get single day)',
		});
	}
};
const handleGetExercise = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const date = req.query.date as string;
		const searchDate = new Date(date);
		const dateID = await DATES.findOne({
			where: { userId: id, date: searchDate },
		});
		if (!dateID)
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		const day = await DATES.findOne({
			where: {
				userId: id,
				date: searchDate,
			},
			include: {
				model: EXERCISE,
				where: {
					dateId: dateID.dataValues.id,
				},
				attributes: {
					exclude: ['id', 'createdAt', 'updatedAt', 'dateId'],
				},
			},
			attributes: {
				exclude: [
					'id',
					'medicalId',
					'nutritionId',
					'exerciseId',
					'userId',
					'createdAt',
					'updatedAt',
				],
			},
		});
		if (!day) {
			return res
				.status(404)
				.send({ ok: false, message: 'Could not find day' });
		}
		return res.status(200).send({ ok: true, message: 'Success', day: day });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: 'Error occured with Database(get single day)',
		});
	}
};
const handleUpdateMedical = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const date = req.query.date as string;
		const updateReq = req.body;
		const searchDate = new Date(date);
		const dateId = await DATES.findOne({
			where: { userId: id, date: searchDate },
		});
		if (!dateId)
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		const medicalId = await MEDICAL.findOne({
			where: {
				dateId: dateId.dataValues.id,
			},
		});
		if (!medicalId) {
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		}
		const updatedFields = setMedicalFields(medicalId, updateReq);
		await MEDICAL.update(updatedFields, {
			where: {
				dateId: dateId.dataValues.id,
			},
		});
		return res
			.status(200)
			.send({ ok: true, message: 'Medical row updated' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: 'Error occured with Database(get single day)',
		});
	}
};
const handleUpdateNutrition = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const date = req.query.date as string;
		const updateReq = req.body;
		const searchDate = new Date(date);
		const dateId = await DATES.findOne({
			where: { userId: id, date: searchDate },
		});
		if (!dateId)
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		const nutritionId = await NUTRITION.findOne({
			where: {
				dateId: dateId.dataValues.id,
			},
		});
		if (!nutritionId) {
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		}
		const updatedFields = setNutritionFields(nutritionId, updateReq);
		await NUTRITION.update(updatedFields, {
			where: {
				dateId: dateId.dataValues.id,
			},
		});
		return res
			.status(200)
			.send({ ok: true, message: 'Nutrition row updated' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: 'Error occured with Database(get single day)',
		});
	}
};
const handleUpdateExercise = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const date = req.query.date as string;
		const updateReq = req.body;
		const searchDate = new Date(date);
		const dateId = await DATES.findOne({
			where: { userId: id, date: searchDate },
		});
		if (!dateId)
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		const exerciseId = await EXERCISE.findOne({
			where: {
				dateId: dateId.dataValues.id,
			},
		});
		if (!exerciseId) {
			return res
				.status(404)
				.send({ ok: false, message: 'Day not found' });
		}
		const updatedFields = setExerciseFields(exerciseId, updateReq);
		await EXERCISE.update(updatedFields, {
			where: {
				dateId: dateId.dataValues.id,
			},
		});
		return res
			.status(200)
			.send({ ok: true, message: 'Exercise row updated' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({
			ok: false,
			message: 'Error occured with Database(get single day)',
		});
	}
};

export {
	handleCreateDay,
	handleGetAllSingleDay,
	handleGetAllDayRange,
	handleGetMedical,
	handleGetNutrition,
	handleGetExercise,
	handleUpdateMedical,
	handleUpdateNutrition,
	handleUpdateExercise,
};
