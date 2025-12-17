import { Repository } from 'typeorm';
import { Store } from '../entities/Store';
import { AppDataSource } from '../config/database';

export const getStoreRepository = (): Repository<Store> => AppDataSource.getRepository(Store);
