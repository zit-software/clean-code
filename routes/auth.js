import {Router} from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter
  .route('/sign-up')
  .get(authController.getSignUp.bind(authController))
  .post(authController.postSignUp.bind(authController));

authRouter
  .route('/sign-in')
  .get(authController.getSignIn.bind(authController))
  .post(authController.postSignIn.bind(authController));

authRouter.route('/sign-out').get(authController.getSignOut.bind(authController));

export default authRouter;
