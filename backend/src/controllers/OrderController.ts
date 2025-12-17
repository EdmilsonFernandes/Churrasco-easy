import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    const order = await orderService.create(req.params.storeId, req.body);
    res.status(201).json(order);
  }

  async list(req: Request, res: Response) {
    const orders = await orderService.list(req.params.storeId);
    res.json(orders);
  }
}
