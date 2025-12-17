import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { StoreService } from '../services/StoreService';

const authService = new AuthService();
const storeService = new StoreService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      const store = await storeService.create(user.id, {
        name: req.body.storeName,
        logoUrl: req.body.logoUrl,
        primaryColor: req.body.primaryColor,
        secondaryColor: req.body.secondaryColor,
      });
      res.status(201).json({ user, store });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed', error });
    }
  }

  async login(req: Request, res: Response) {
    const user = await authService.findByEmail(req.body.email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ user });
  }
}
