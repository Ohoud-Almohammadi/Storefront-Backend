import client from '../../database/index';

export type OrderProductsType = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};
export class OrderProductsModle {
  async truncate(): Promise<void> {
    try {
      const sql = 'TRUNCATE TABLE order_products';
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql);

      conn.release();
    } catch (err) {
      throw new Error(`Could not truncate table order_products and receive an Error: ${err}`);
    }
  }
}

export default OrderProductsType;
