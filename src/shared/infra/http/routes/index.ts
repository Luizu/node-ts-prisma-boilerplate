import { Router } from 'express';

import { accountsRouter } from './accounts.routes';

export const routes = Router();

routes.use('/account', accountsRouter);
