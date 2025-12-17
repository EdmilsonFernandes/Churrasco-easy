import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

const productService = new ProductService();

export class ProductController {
  async create(req: Request, res: Response) {
    const product = await productService.create(req.params.storeId, req.body);
    res.status(201).json(product);
  }

  async list(req: Request, res: Response) {
    const products = await productService.listByStore(req.params.storeId);
    res.json(products);
  }
}
