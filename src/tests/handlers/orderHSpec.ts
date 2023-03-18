import supertest from 'supertest';
import { OrderModel } from '../../api/order/orderModle';
import server from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(server);

describe('Order Handler (endpoints) Test', () => {
  let token = '';
  const testUser4 = {
    firstName: 'osama',
    lastName: 'hrb',
    email: 'osama@gmail.com',
    password: 'testUserpass1234'
  };
  it('should create user befor test', async () => {
    const res = await request.post('/users/signup').send(testUser4);
    token = res.body;
    expect(res.status).toBe(200);
  });
  beforeAll(() => {
    spyOn(OrderModel.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 2,
        quantity: 31,
        status: 'active',
        user_id: 2
      })
    );
    spyOn(OrderModel.prototype, 'getAllOrders').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          quantity: 21,
          status: 'completed',
          user_id: 2
        },
        {
          id: 2,
          quantity: 31,
          status: 'active',
          user_id: 2
        }
      ])
    );
    spyOn(OrderModel.prototype, 'getCurrent').and.returnValue(
      Promise.resolve({
        id: 2,
        quantity: 31,
        status: 'active',
        user_id: 2
      })
    );

    spyOn(OrderModel.prototype, 'updateStatus').and.returnValue(
      Promise.resolve({
        id: 1,
        quantity: 21,
        status: 'active',
        user_id: 2
      })
    );
    spyOn(OrderModel.prototype, 'addProduct').and.returnValue(
      Promise.resolve({
        id: 1,
        quantity: 21,
        order_id: 1,
        product_id: 1
      })
    );
  });

  it('create order endpoint', async () => {
    const res = await request.post('/orders').set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      quantity: 31,
      status: 'active',
      user_id: 2
    });
  });
  it('get all orders endpoint', async () => {
    const res = await request.get('/orders/2').set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        quantity: 21,
        status: 'completed',
        user_id: 2
      },
      {
        id: 2,
        quantity: 31,
        status: 'active',
        user_id: 2
      }
    ]);
  });
  it('get current order by user id endpoint', async () => {
    const res = await request.get('/orders/current/2').set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      quantity: 31,
      status: 'active',
      user_id: 2
    });
  });
  it('add product to existing order endpoint', async () => {
    const res = await request.post('/orders/1/products').set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      quantity: 21,
      order_id: 1,
      product_id: 1
    });
  });
  it('updates user order endpoint', async () => {
    const res = await request
      .put('/orders')
      .send({ id: 1, status: 'active' })
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      quantity: 21,
      status: 'active',
      user_id: 2
    });
  });
});
