import bcrypt from 'bcryptjs';
import { getUserRepository } from '../repositories/UserRepository';
import { CreateUserDto } from '../dto/CreateUserDto';
import { User } from '../entities/User';

export class AuthService {
  async register(dto: CreateUserDto): Promise<User> {
    const repo = getUserRepository();
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = repo.create({
      fullName: dto.fullName,
      email: dto.email,
      passwordHash,
      phone: dto.phone,
      address: dto.address,
    });
    return repo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return getUserRepository().findOne({ where: { email } });
  }
}
