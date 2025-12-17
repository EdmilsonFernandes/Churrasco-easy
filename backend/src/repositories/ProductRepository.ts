import { Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { AppDataSource } from '../config/database';

export const getProductRepository = (): Repository<Product> => AppDataSource.getRepository(Product);
