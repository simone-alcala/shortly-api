import { Router } from 'express';

import { validateId, validateUrl, validateShorUrl } from './../middlewares/validateUrl.js';

import validateSession from './../middlewares/validateSession.js';

import { createUrl, getUrlById, deleteUrl, openUrl} from './../controllers/urlController.js';

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateSession, validateUrl, createUrl );
urlRouter.get('/urls/:id', validateId, getUrlById );
urlRouter.get('/urls/open/:shortUrl', validateShorUrl, openUrl );
urlRouter.delete('/urls/:id', validateSession, validateId, deleteUrl );

export default urlRouter;