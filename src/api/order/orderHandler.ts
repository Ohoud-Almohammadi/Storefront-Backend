import express, { Request, Response, NextFunction } from 'express';
import { OrderModel } from './orderModle';
import { OrderType } from './orderUI';

// Create instance of OrderModel
const store: OrderModel = new OrderModel();

class OrderHandler {
  // express handler index function to get all orders for specified user
  async getAllOrders(req: Request, res: Response) {
    try {
      const userId: number = parseInt(req.params.user_id);
      const orders: OrderType[] = await store.getAllOrders(userId);
      res.json(orders);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }

  // express handler index function to get current order for specified user
  async getCurrent(req: Request, res: Response) {
    try {
      const userId: number = parseInt(req.params.user_id);
      const currOrder: OrderType = await store.getCurrent(userId);
      res.json(currOrder);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
  // express handler index function to create order for specified user
  async create(req: Request, res: Response) {
    try {
      const newOrder: OrderType = {
        quantity: req.body.quantity,
        status: req.body.status,
        user_id: req.body.user_id,
        id: undefined as unknown as number
      };
      const order: OrderType = await store.create(newOrder);
      return res.json(order);
    } catch (err) {
      res.status(400).json('Failed to create order');
    }
  }
  async updateStatus(req: Request, res: Response) {
    const status: string = req.body.status;
    const orderId = parseInt(req.body.id as string);
    // chick if status exist
    if (orderId && ['active', 'completed'].includes(status)) {
      const updateedStatus: OrderType = await store.updateStatus(status, orderId);
      return res.json(updateedStatus);
    } else {
      return res.status(400).json('cannot update status');
    }
  }

  async addProduct(req: Request, res: Response) {
    const quantity: number = req.body.quantity;
    const order_id: number = req.body.order_id;
    const product_id: number = req.body.product_id;

    try {
      const newProduct = await store.addProduct(quantity, order_id, product_id);
      res.send(newProduct);
    } catch (err) {
      res.status(400).json(`The order ${order_id} or product ${product_id} do not exist. ${err}`);
    }
  }
}
export default new OrderHandler();
