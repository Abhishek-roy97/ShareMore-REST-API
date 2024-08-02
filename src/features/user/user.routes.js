import express from 'express';
import UserController from './user.controller.js';
import { uservalidation, loginValidation } from '../../middlewares/validation.middleware.js';

const userRouter = express.Router();

const userController = new UserController();

userRouter.get('/',userController.getAllUsers);

userRouter.post('/signup',uservalidation,userController.signUp);

userRouter.post('/signin',loginValidation,userController.signIn);

export default userRouter;