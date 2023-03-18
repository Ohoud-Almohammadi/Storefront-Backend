import express, { Request, Response, NextFunction } from 'express';
import UserHandler from './userHandler';
import { authorize } from '../../middlewares/tokenAuth';
const user_routes = express.Router();
// make this file has acess to all express methods (get..)
user_routes.get('/users', authorize, UserHandler.index);
user_routes.get('/users/:id', authorize, UserHandler.show);
user_routes.post('/users/signup', UserHandler.create);
user_routes.post('/users/login', authorize, UserHandler.login);

export default user_routes;
