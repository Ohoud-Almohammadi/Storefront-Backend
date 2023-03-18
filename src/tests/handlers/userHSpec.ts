import supertest from 'supertest';
import { UserModel } from '../../api/user/userModle';
import server from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(server);
describe('Users Handler(endpoints) Test', () => {
  let token = '';
  const testUser3 = {
    firstName: 'ahmad',
    lastName: 'hrb',
    email: 'ahmad@gmail.com',
    password: 'testUserpass1234'
  };
  it('should create user befor test', async () => {
    const res = await request.post('/users/signup').send(testUser3);
    token = res.body;
    expect(res.status).toBe(200);
  });
  beforeAll(() => {
    spyOn(UserModel.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          firstName: 'dived',
          lastName: 'hrb',
          email: 'devid@gmail.com',
          password: 'testUserpass1234'
        }
      ])
    );
    spyOn(UserModel.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: 1,
        firstName: 'dived',
        lastName: 'hrb',
        email: 'devid@gmail.com',
        password: 'testUserpass1234'
      })
    );
    spyOn(UserModel.prototype, 'login').and.returnValue(
      Promise.resolve({
        id: 1,
        firstName: 'dived',
        lastName: 'hrb',
        email: 'devid@gmail.com',
        password: 'testUserpass1234'
      })
    );
  });
  it('get all users endpoint', async () => {
    const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        firstName: 'dived',
        lastName: 'hrb',
        email: 'devid@gmail.com',
        password: 'testUserpass1234'
      }
    ]);
  });

  it('get a user by id endpoint ', async () => {
    const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      firstName: 'dived',
      lastName: 'hrb',
      email: 'devid@gmail.com',
      password: 'testUserpass1234'
    });
  });
  it('create user endpoint', async () => {
    const response = await request
      .post('/users/signup')
      .send({
        firstName: 'dived',
        lastName: 'hrb',
        email: 'devid@gmail.com',
        password: 'testUserpass1234'
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('login a user endpoint ', async () => {
    const response = await request
      .post('/users/login')
      .send({
        firstName: 'dived',
        lastName: 'hrb',
        email: 'devid@gmail.com',
        password: 'testUserpass1234'
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
