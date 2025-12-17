import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { StoreController } from '../controllers/StoreController';
import { ProductController } from '../controllers/ProductController';
import { OrderController } from '../controllers/OrderController';

const router = Router();
const authController = new AuthController();
const storeController = new StoreController();
const productController = new ProductController();
const orderController = new OrderController();

router.post('/auth/register', (req, res) => authController.register(req, res));
router.post('/auth/login', (req, res) => authController.login(req, res));

router.get('/stores/:slug', (req, res) => storeController.getBySlug(req, res));
router.put('/stores/:id', (req, res) => storeController.update(req, res));
router.put('/stores/:id/status', (req, res) => storeController.setStatus(req, res));

router.post('/stores/:storeId/products', (req, res) => productController.create(req, res));
router.get('/stores/:storeId/products', (req, res) => productController.list(req, res));

router.post('/stores/:storeId/orders', (req, res) => orderController.create(req, res));
router.get('/stores/:storeId/orders', (req, res) => orderController.list(req, res));

export default router;
