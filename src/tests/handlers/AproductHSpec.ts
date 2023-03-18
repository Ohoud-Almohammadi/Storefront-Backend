import supertest from 'supertest';
import { productModel } from '../../api/product/productModle';
import server from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(server);

describe('Product handler (endpoints) Test', () => {
  let token = '';
  const testUser5 = {
    firstName: 'sara',
    lastName: 'hrb',
    email: 'sara@gmail.com',
    password: 'testUserpass1234'
  };
  it('should create user befor test', async () => {
    const res = await request.post('/users/signup').send(testUser5);
    token = res.body;
    expect(res.status).toBe(200);
  });
  beforeAll(() => {
    spyOn(productModel.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          name: 'happy life',
          price: 30,
          category: 'book'
        }
      ])
    );
    spyOn(productModel.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: 1,
        name: 'happy life',
        price: 30,
        category: 'book'
      })
    );
    spyOn(productModel.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        name: 'happy life',
        price: 30,
        category: 'book'
      })
    );
  });
  it('create product endpoint', async () => {
    const res = await request.post('/products').set('Authorization', 'Bearer ' + token);
    token = res.body;
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'happy life',
      price: 30,
      category: 'book'
    });
  });
  it('gets all products endpoint', async () => {
    const res = await request.get('/products').set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        name: 'happy life',
        price: 30,
        category: 'book'
      }
    ]);
  });
  it('gets product by id endpoint', async () => {
    const res = await request.get('/products/1').set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'happy life',
      price: 30,
      category: 'book'
    });
  });
});
