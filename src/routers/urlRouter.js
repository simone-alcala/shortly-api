import { Router } from 'express';

import { validateId, validateUrl } from './../middlewares/validateUrl.js';

import validateSession from './../middlewares/validateSession.js';

import { createUrl, getUrlById, deleteUrl } from './../controllers/urlController.js';

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateSession, validateUrl, createUrl );
urlRouter.get('/urls/:id', validateId, getUrlById );
urlRouter.delete('/urls/:id', validateSession, validateId, deleteUrl );

export default urlRouter;