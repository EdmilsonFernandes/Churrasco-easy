import { Repository } from 'typeorm';
import { Order } from '../entities/Order';
import { AppDataSource } from '../config/database';

export const getOrderRepository = (): Repository<Order> => AppDataSource.getRepository(Order);
