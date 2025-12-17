import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../entities/User';
import { Store } from '../entities/Store';
import { StoreSettings } from '../entities/StoreSettings';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.databaseUrl,
  entities: [User, Store, StoreSettings, Product, Order, OrderItem],
  synchronize: false,
  logging: false,
});

export const initializeDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
