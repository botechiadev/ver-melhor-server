import express from 'express'

import { UserController } from '../controllers/UserController';
import { UserBusiness } from '../business/UserBusiness';
import { UserDatabase } from '../database/UserDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { HashManager } from '../services/HashManager';

// correcao userRouter
export const userRouter = express.Router();


const userController = new UserController(
   new UserBusiness(
      new UserDatabase(),
      new IdGenerator(),
      new TokenManager(),
      new HashManager()
   )
);


userRouter.post('/signup' ,userController.signup1);

userRouter.get('/data' ,userController.getUserById);
userRouter.post('/login' ,userController.login);