import { Router } from 'express';

import authMiddleware from './middleware/authMiddlewate'

import { getUser, postUser, putEmail, deleteUser } from './controller/UserController'
import { postPosts, getPost } from './controller/PostControllers'
import { authUser, index } from './controller/AuthController'

const routes = Router();

// User
routes.get('/user', getUser);
routes.post('/user', postUser);
routes.put('/user/:user_id', putEmail);
routes.delete('/user/:user_id', deleteUser);

// posts
routes.post('/user/:id/posts', postPosts);
routes.get('/posts', getPost);

// authenticate user
routes.post('/auth', authUser);
routes.get('/auth', authMiddleware, index);

export default routes;