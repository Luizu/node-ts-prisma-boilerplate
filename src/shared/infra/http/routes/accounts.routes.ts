import { CreateAccountController } from '@modules/accounts/useCases/CreateAccount/CreateAccountController';
import { Router } from 'express';

const createAccountController = new CreateAccountController();

export const accountsRouter = Router();

accountsRouter.post('/', createAccountController.handle);
