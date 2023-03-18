import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHead: string | undefined = req.headers.authorization;
    const token: string = authHead ? authHead.split(' ')[1] : '';

    const decoded: string | object = jsonwebtoken.verify(token, config.token_secret as string);
    res.locals.userData = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized Access' });
    next(err);
  }
};
