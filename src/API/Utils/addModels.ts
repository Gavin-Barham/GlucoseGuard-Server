import { USERS } from '../../Database/Models/Users.js';
import { DATES } from '../../Database/Models/Dates.js';
import { MEDICAL } from '../../Database/Models/Medical.js';
import { NUTRITION } from '../../Database/Models/Nutrition.js';
import { EXERCISE } from '../../Database/Models/Exercise.js';
import { DBConnection } from '../../Database/config.js';

const addModels = () => {
	DBConnection.addModels([USERS, DATES, MEDICAL, NUTRITION, EXERCISE]);
};

export { addModels };
