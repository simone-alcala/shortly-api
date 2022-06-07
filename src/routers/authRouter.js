import { Router } from 'express';

import { validateSignIn } from './../middlewares/validateSignIn.js';
import { validateSignUp } from './../middlewares/validateSignUp.js';
import { signUp, signIn } from './../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', validateSignUp, signUp );
authRouter.post('/signin', validateSignIn, signIn );

export default authRouter;