import { Router } from 'express';
// 1. IMPORTANTE: Adicionei o express aqui para podermos usar o express.static
import express from 'express'; 
import multer from 'multer';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductController from './app/controllers/ProductController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import adminMiddleware from './app/middlewares/admin.js';
import authMiddleware from './app/middlewares/auth.js';
import multerConfig from './config/multer.cjs';

const routes = new Router();

const upload = multer(multerConfig);

// 2. IMPORTANTE: Adicionei esta rota pública para liberar o acesso às imagens da pasta 'uploads'
routes.use('/product-file', express.static('./uploads'));

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.get('/products', ProductController.index);
routes.get('/categories', CategoryController.index);
routes.use('/product-file', express.static('./uploads'));
routes.use('/category-file', express.static('./uploads'));


routes.use(authMiddleware);
routes.post(
  '/products',
  adminMiddleware,
  upload.single('file'),
  ProductController.store,
);
routes.put(
  '/products/:id',
  adminMiddleware,
  upload.single('file'),
  ProductController.update,
);
routes.delete(
  '/products/:id',
  adminMiddleware,
  ProductController.delete,
);

routes.post(
  '/categories',
  adminMiddleware,
  upload.single('file'),
  CategoryController.store,
);
routes.put(
  '/categories/:id',
  adminMiddleware,
  upload.single('file'),
  CategoryController.update,
);

routes.post('/orders', OrderController.store);

routes.get('/orders', OrderController.index);

routes.put(
  '/orders/:id',
  adminMiddleware,
  OrderController.update,
);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;
