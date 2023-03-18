import { OrderModel } from '../../api/order/orderModle';
import { UserModel } from '../../api/user/userModle';
import { productModel } from '../../api/product/productModle';
import { OrderType } from '../../api/order/orderUI';
import { UserType } from '../../api/user/userUI';
import { ProductType } from '../../api/product/productUI';
import jwt from 'jsonwebtoken';
import Client from '../../database';

const order = new OrderModel();
const user = new UserModel();
const product = new productModel();
const testUser2 = {
  firstName: 'kj',
  lastName: 'hrb',
  email: 'kj@gmail.com',
  password: 'testUserpass1234'
};
const testProduct = {
  id: 1,
  name: 'testProductName',
  price: 1200
};

describe('Order Model Test', () => {
  beforeAll(async () => {
    await user.create(testUser2 as UserType);
    await product.create(testProduct as ProductType);
  });
  it('should have an create method', () => {
    expect(order.create).toBeDefined();
  });
  it('should have get all order for spesfic user method', () => {
    expect(order.getAllOrders).toBeDefined();
  });
  it('should have an current method', () => {
    expect(order.getCurrent).toBeDefined();
  });
  it('should have an update method', () => {
    expect(order.updateStatus).toBeDefined();
  });
  it('should have add product method ', () => {
    expect(order.addProduct).toBeDefined();
  });

  it('should create order ', async () => {
    const orderSpec = await order.create({
      quantity: 2,
      status: 'active',
      user_id: 1
    } as OrderType);
    expect(orderSpec).toEqual({
      id: 1,
      quantity: 2,
      status: 'active',
      user_id: 1
    });
  });
  it('should get all orders for user', async () => {
    const result: OrderType[] = await order.getAllOrders(1);
    expect(result).toEqual([{ id: 1, quantity: 2, status: 'active', user_id: 1 }]);
  });
  it('should get curent order by user', async () => {
    const result: OrderType = await order.getCurrent(1);
    expect(result).toEqual({
      id: 1,
      quantity: 2,
      status: 'active',
      user_id: 1
    });
  });
  it('should update statuse order by user', async () => {
    const result: OrderType = await order.updateStatus('completed', 1);
    expect(result).toEqual({
      id: 1,
      quantity: 2,
      status: 'completed',
      user_id: 1
    });
  });
  it('should add product to order', async () => {
    const result = await order.addProduct(12, 1, 1);
    expect(result).toEqual({
      id: 1,
      quantity: 12,
      order_id: 1,
      product_id: 1
    });
  });
});
