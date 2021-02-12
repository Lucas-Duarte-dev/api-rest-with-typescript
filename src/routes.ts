import { Router, Request, Response } from 'express';

import authMiddleware from './middleware/authMiddlewate'

import {getUser, postUser} from './controller/UserController'
import {authUser, index} from './controller/AuthController'

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    response.json({ hello: 'world' });
})

routes.get('/user', getUser);
routes.post('/user', postUser);
routes.post('/auth', authUser);
routes.get('/auth', authMiddleware, index);

export default routes;