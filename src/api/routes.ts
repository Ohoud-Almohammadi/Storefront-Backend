import express, { Application, Request, Response } from 'express';
import user_routes from '../api/user/userRoutes';
import order_routes from '../api/order/orderRoutes';
import product_routes from '../api/product/productRoutes';

// Create global router object
const apiRouter = express.Router();
apiRouter.use(user_routes);
apiRouter.use(order_routes);
apiRouter.use(product_routes);

export default apiRouter;
