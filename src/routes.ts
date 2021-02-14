import { Router, Request, Response } from 'express';

import authMiddleware from './middleware/authMiddlewate'

import {getUser, postUser, putEmail, deleteUser} from './controller/UserController'
import {postProfile} from './controller/ProfileController'
import {authUser, index} from './controller/AuthController'

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    response.json({ hello: 'world' });
})

// Profile
routes.post('/user/:user_id/profile', postProfile);

// User
routes.get('/user', getUser);
routes.post('/user', postUser);
routes.put('/user/:user_id', putEmail);
routes.delete('/user/:user_id', deleteUser);

// authenticate user
routes.post('/auth', authUser);
routes.get('/auth', authMiddleware, index);

export default routes;