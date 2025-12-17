import { Request, Response } from 'express';
import { StoreService } from '../services/StoreService';

const storeService = new StoreService();

export class StoreController {
  async getBySlug(req: Request, res: Response) {
    const store = await storeService.findBySlug(req.params.slug);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json(store);
  }

  async update(req: Request, res: Response) {
    const store = await storeService.update(req.params.id, req.body);
    res.json(store);
  }

  async setStatus(req: Request, res: Response) {
    const store = await storeService.toggleStatus(req.params.id, req.body.isOpen);
    res.json(store);
  }
}
