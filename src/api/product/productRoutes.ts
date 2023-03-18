import express, { Request, Response, NextFunction } from 'express';
import ProductHandler from '../product/productHandler';
import { authorize } from '../../middlewares/tokenAuth';

const product_routes = express.Router();

product_routes.get('/products', ProductHandler.index);
product_routes.get('/products/:id', ProductHandler.show);
product_routes.post('/products', authorize, ProductHandler.create);

export default product_routes;
