import express, { Request, Response, NextFunction } from 'express';
import OrderHandler from './orderHandler';
import { authorize } from '../../middlewares/tokenAuth';

const order_routes = express.Router();

order_routes.get('/orders/:user_id', authorize, OrderHandler.getAllOrders);
order_routes.get('/orders/current/:user_id', authorize, OrderHandler.getCurrent);
order_routes.post('/orders', authorize, OrderHandler.create);
order_routes.put('/orders', authorize, OrderHandler.updateStatus);
order_routes.post('/orders/:id/products', authorize, OrderHandler.addProduct);

export default order_routes;
