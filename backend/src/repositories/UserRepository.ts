import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../config/database';

export const getUserRepository = (): Repository<User> => AppDataSource.getRepository(User);
