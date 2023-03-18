import { UserModel } from '../../api/user/userModle';
import { UserType, UserCreated } from '../../api/user/userUI';
import supertest from 'supertest';
import server from '../../server';

const store: UserModel = new UserModel();
const request = supertest(server);
describe('User Model Test', () => {
  let token = '';
  const testUser9 = {
    firstName: 'userHT',
    lastName: 'hrb',
    email: 'userHT@gmail.com',
    password: 'testUserpass1234'
  };
  it('should create user befor test', async () => {
    const res = await request.post('/users/signup').send(testUser9);
    token = res.body;
    expect(res.status).toBe(200);
  });

  it('should have  create user methhod', () => {
    expect(store.create).toBeDefined();
  });

  it('should have  get all users method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have get user by id method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have login method', () => {
    expect(store.login).toBeDefined();
  });

  it('should create a user ', async () => {
    const result = await store.create({
      id: 1,
      firstName: 'dived',
      lastName: 'hrb',
      email: 'devid@gmail.com',
      password: 'testUserpass1234'
    });
    // the email is unique value, so i use it to check user existence
    expect(result.email).toEqual('devid@gmail.com');
    expect(result.password).not.toEqual('testUserpass1234');
  });

  it('should return all users', async () => {
    const result: UserType[] = await store.index();
    expect(result[1].id).toEqual(2);
    expect(result[1].email).toEqual('devid@gmail.com');
    expect(result[1].password.length).toBeGreaterThanOrEqual(60);
    expect(result[1].password).not.toEqual('testUserpass1234');
  });

  it('should return user email and password by id', async () => {
    const id: number = 2;
    const result: UserType = await store.show(id);
    expect(result.email).toEqual('devid@gmail.com');
    expect(result.password.length).toBeGreaterThanOrEqual(60);
  });

  it('should login user correctly', async () => {
    const result = await store.login('devid@gmail.com', 'testUserpass1234');
    if(result === null) {
      throw new Error('User not found');
    }
    expect(result.email).toEqual('devid@gmail.com');
    expect(result.password).toEqual(result.password);

  });
});