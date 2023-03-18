import jsonwebtoken from 'jsonwebtoken';
import config from '../config';
export const tokenGenerator: Function = (id: number): string => {
  return jsonwebtoken.sign(id.toString(), config.token_secret as string);
};
