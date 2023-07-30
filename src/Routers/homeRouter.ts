import express, { Router } from 'express';

import { helloWorld } from '../Controllers/helloWorld.js';

const router: Router = express.Router(); 

router.get('/', helloWorld);

export default router;