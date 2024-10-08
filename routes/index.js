import {Router} from 'express';
import {requireLogin} from '../middlewares/auth.js';
import authRouter from './auth.js';
import taskRouter from './task.js';

const router = Router();

router.use('/task', requireLogin, taskRouter);
router.use('/auth', authRouter);
router.use('*', (_req, res) => res.redirect('/task'));

export default router;
