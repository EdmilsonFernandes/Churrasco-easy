import slugify from 'slugify';
import { CreateStoreDto } from '../dto/CreateStoreDto';
import { getStoreRepository } from '../repositories/StoreRepository';
import { getUserRepository } from '../repositories/UserRepository';
import { Store } from '../entities/Store';
import { StoreSettings } from '../entities/StoreSettings';

export class StoreService {
  async create(ownerId: string, dto: CreateStoreDto): Promise<Store> {
    const storeRepo = getStoreRepository();
    const user = await getUserRepository().findOneByOrFail({ id: ownerId });

    const slug = dto.slug || slugify(dto.name, { lower: true, strict: true });
    const store = storeRepo.create({
      name: dto.name,
      slug,
      owner: user,
      ownerId: user.id,
      settings: new StoreSettings(),
    });
    store.settings.logoUrl = dto.logoUrl;
    store.settings.primaryColor = dto.primaryColor;
    store.settings.secondaryColor = dto.secondaryColor;
    return storeRepo.save(store);
  }

  async update(storeId: string, payload: Partial<Store>): Promise<Store> {
    const repo = getStoreRepository();
    const store = await repo.findOneOrFail({ where: { id: storeId }, relations: ['settings'] });
    repo.merge(store, payload);
    return repo.save(store);
  }

  async toggleStatus(storeId: string, isOpen: boolean): Promise<Store> {
    return this.update(storeId, { isOpen });
  }

  async findBySlug(slug: string): Promise<Store | null> {
    return getStoreRepository().findOne({ where: { slug }, relations: ['settings'] });
  }
}
