import { Router } from 'express';

import authMiddleware from './middleware/authMiddlewate'

import { getUser, getOneUser ,postUser, putEmail, deleteUser } from './controller/UserController'
import { postPosts, getPost } from './controller/PostControllers'
import { authUser, index } from './controller/AuthController'

const routes = Router();

// User
routes.get('/user', getUser);
routes.get('/user/:user_id', getOneUser);
routes.post('/user', postUser);
routes.put('/user/:user_id', putEmail);
routes.delete('/user/:user_id', deleteUser);

// posts
routes.post('/user/:id/posts', postPosts);
routes.get('/posts', getPost);

// authenticate user
routes.get('/auth/login', authUser);
routes.get('/auth', authMiddleware, index);

export default routes;