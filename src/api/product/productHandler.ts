import express, { Request, Response, NextFunction } from 'express';
import { productModel } from './productModle';
import { ProductType } from './productUI';
// Create instance of productModel
const store: productModel = new productModel();

class ProductHandler {
  // express handler index function to get all products
  async index(req: Request, res: Response) {
    try {
      const products: ProductType[] = await store.index();
      res.json(products);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }

  //express handler show function to get product by id
  async show(req: Request, res: Response) {
    try {
      const productId: number = parseInt(req.params.id);
      const product: ProductType = await store.show(productId);
      res.json(product);
    } catch (err) {
      res.status(400);
      res.json(`cannot show product. ${err}`);
    }
  }
  // express handler create function to create new product
  async create(req: Request, res: Response) {
    try {
      const newProduct: ProductType = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        id: undefined as unknown as number
      };
      const product: ProductType = await store.create(newProduct);
      return res.json(product);
    } catch (err) {
      res.status(400).json('Failed to create product');
    }
  }
}
export default new ProductHandler();
