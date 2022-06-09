import { Router } from 'express';

import { validateId } from './../middlewares/validateUser.js';
import validateSession from './../middlewares/validateSession.js';
import { getUserById , getUsersRanking} from './../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/ranking', getUsersRanking );
usersRouter.get('/users/:id', validateSession, validateId, getUserById );

export default usersRouter;