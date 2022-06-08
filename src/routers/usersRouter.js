import { Router } from 'express';

import { validateId } from './../middlewares/validateUser.js';

import { getUserById , getUsersRanking} from './../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/users/ranking', getUsersRanking );
usersRouter.get('/users/:id', validateId, getUserById );

export default usersRouter;