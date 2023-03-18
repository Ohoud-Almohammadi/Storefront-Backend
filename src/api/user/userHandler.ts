import express, { Request, Response, NextFunction } from 'express';
import { UserModel } from './userModle';
import { UserType } from './userUI';
import { UserCreated } from './userUI';
import { tokenGenerator } from '../../utilities/tokenGen';
// Create instance of UserModel
const store: UserModel = new UserModel();

class UserHandler {
  // express handler index function to get all users
  async index(_req: Request, res: Response) {
    try {
      const users: UserType[] = await store.index();
      res.json(users);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }

  // express handler show function
  async show(req: Request, res: Response) {
    try {
      const userId: number = parseInt(req.params.id);
      const user: UserType = await store.show(userId);
      res.json(user);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
  // express handler create function
  async create(req: Request, res: Response) {
    try {
      const user1: UserType = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        id: undefined as unknown as number
      };
      const newUser = await store.create(user1);
      // create token for new user
      const token: string = tokenGenerator(newUser.id);
      res.status(200).json(token);
    } catch (err) {
      res.status(400).json('Failed to create user');
    }
  }
  // express handler authenticate function( match passwords with enterd username)
  async login(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const isRegistered: UserType | null = await store.login(email, password);

      if (isRegistered) {
        const token: string = tokenGenerator(isRegistered.id);
        res.status(200).json(token);

        return;
      }

      return res.json(
        'We dont find an user with the email provided. Please, sign up to the store ...'
      );
    } catch (error) {
      res.status(401);
      res.json({ error });
    }
  }

}
export default new UserHandler();
