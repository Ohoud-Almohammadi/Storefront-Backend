import { ProductType } from './productUI';
import client from '../../database/index';
import { QueryResult, PoolClient } from 'pg';
export class productModel {
  // get all products
  async index(): Promise<ProductType[]> {
    try {
      // Open connection to DB
      const conn: PoolClient = await client.connect();
      // sql command run on table
      const sql: string = 'SELECT * FROM products';
      // Run query on DB
      const result: QueryResult = await conn.query(sql);
      // Close connection
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get all products). Error: ${err}`);
    }
  }

  // get product by id
  async show(productId: number): Promise<ProductType> {
    try {
      // Open connection to DB
      const conn: PoolClient = await client.connect();
      // sql command run on table
      const sql: string = 'SELECT * FROM products WHERE id = $1';
      // Run query on DB
      const result: QueryResult = await conn.query(sql, [productId]);
      // Close connection
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get product by id. Error: ${err}`);
    }
  }
  // create product
  async create(product: ProductType): Promise<ProductType> {
    try {
      const { name, price, category } = product;
      const conn: PoolClient = await client.connect();
      const sql: string =
        'INSERT INTO products(name, price, category) VALUES($1,$2,$3) RETURNING *';
      const result: QueryResult = await conn.query(sql, [name, price, category]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new product. Error: ${err}`);
    }
  }
}
