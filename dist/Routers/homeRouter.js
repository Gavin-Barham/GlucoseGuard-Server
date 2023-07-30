import express from 'express';
import { helloWorld } from '../Controllers/helloWorld.js';
const router = express.Router();
router.get('/', helloWorld);
export default router;
//# sourceMappingURL=homeRouter.js.map