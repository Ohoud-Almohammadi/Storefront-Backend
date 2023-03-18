import client from '../../database/index';
import bcrypt from 'bcrypt';
import config from '../../config';
import { UserType } from './userUI';
import { UserCreated } from './userUI';
import { QueryResult, PoolClient } from 'pg';
import { tokenGenerator } from '../../utilities/tokenGen';

const saltRounds: string = config.saltRounds as string;
const pepper: string = config.pepper as string;

//Create class with table name include CRUD oprations
export class UserModel {
  //  git all users in DB
  async index(): Promise<UserType[]> {
    try {
      // Open connection to DB
      const conn: PoolClient = await client.connect();
      // sql command run on table
      const sql: string = 'SELECT * FROM users';
      // Run query on DB
      const result: QueryResult = await conn.query(sql);
      // Close connection
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get all users. Error: ${err}`);
    }
  }
  //show user by id
  async show(userId: number): Promise<UserType> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM users WHERE id = $1';
      const result: QueryResult = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get users with id ${userId}. Error: ${err}`);
    }
  }
  // create user in DB with hashed password
  async create(user: UserType): Promise<UserType> {
    try {
      // save password in DB as hash
      const conn: PoolClient = await client.connect();
      const sql: string =
        'INSERT INTO users (firstName, lastName, email, password) VALUES($1,$2,$3,$4) RETURNING *';
      const hashedPassword: string = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
      const result: QueryResult = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.email,
        hashedPassword
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new user ${user.firstName}. Error: ${err}`);
    }
  }
  // Method used while sign in, to chick matcheing between enterd password and password in DB
  async login(email: string, password: string): Promise<UserType | null> {
    const conn = await client.connect();
    const sql = 'SELECT * FROM users where email = $1';
    const result = await conn.query(sql, [email]);
    // if this user already exists, save it and log it
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {

        return user;
      }
      console.log('No user found with the provided email and password');
    }
    return null;
  }
}
