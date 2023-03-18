import { OrderType } from './orderUI';
import client from '../../database/index';
import { QueryResult, PoolClient } from 'pg';
import { OrderProductsType } from '../order_product/order_productModle';

export class OrderModel {
  // git all orders for a specific user
  async getAllOrders(userId: number): Promise<OrderType[]> {
    try {
      // Open connection to DB
      const conn: PoolClient = await client.connect();
      // sql command run on table
      const sql: string = 'SELECT * FROM orders WHERE user_id =$1';
      // Run query on DB
      const result: QueryResult = await conn.query(sql, [userId]);
      // Close connection
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get all orders for user ${userId}). Error: ${err}`);
    }
  }
  // get current order for specific user
  async getCurrent(userId: number): Promise<OrderType> {
    try {
      // Open connection to DB
      const conn: PoolClient = await client.connect();
      // sql command run on table
      const sql: string = `SELECT * FROM orders WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`;
      // Run query on DB
      const result: QueryResult = await conn.query(sql);
      // Close connection
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get current order for user ${userId}). Error: ${err}`);
    }
  }
  // create order
  async create(order: OrderType): Promise<OrderType> {
    try {
      const { quantity, status, user_id } = order;
      const conn: PoolClient = await client.connect();
      const sql: string =
        'INSERT INTO orders (quantity, status, user_id) VALUES($1,$2,$3) RETURNING *';
      const result: QueryResult = await conn.query(sql, [quantity, status, user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new order. Error: ${err}`);
    }
  }
  async updateStatus(status: string, orderId: number): Promise<OrderType> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = 'UPDATE orders SET status= $1 WHERE id=$2 RETURNING *';
      const result = await conn.query(sql, [status, orderId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update order ${orderId} status. Error: ${err}`);
    }
  }
  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<OrderProductsType> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1,$2,$3) RETURNING *';
      const result: QueryResult = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new product. Error: ${err}`);
    }
  }
}
