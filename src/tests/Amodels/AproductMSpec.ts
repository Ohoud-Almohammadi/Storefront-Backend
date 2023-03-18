import { productModel } from '../../api/product/productModle';
import { ProductType } from '../../api/product/productUI';

const product: productModel = new productModel();

describe('Product Model Test', () => {
  it('should have a create  method', () => {
    expect(product.create).toBeDefined();
  });
  it('should have a show id method', () => {
    expect(product.show).toBeDefined();
  });
  it('should have a index method', () => {
    expect(product.index).toBeDefined();
  });
  it('should create a product', async () => {
    const result: ProductType = await product.create({
      name: 'happy life',
      price: 30,
      category: 'book'
    });
    expect(result).toEqual({
      id: 1,
      name: 'happy life',
      price: 30,
      category: 'book'
    });
  });
  it('should return a list of products', async () => {
    const result: ProductType[] = await product.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'happy life',
        price: 30,
        category: 'book'
      }
    ]);
  });

  it('should return a product', async () => {
    const result: ProductType = await product.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'happy life',
      price: 30,
      category: 'book'
    });
  });
});
