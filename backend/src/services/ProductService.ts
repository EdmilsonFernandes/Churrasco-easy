import { CreateProductDto } from '../dto/CreateProductDto';
import { getProductRepository } from '../repositories/ProductRepository';
import { getStoreRepository } from '../repositories/StoreRepository';
import { Product } from '../entities/Product';

export class ProductService {
  async create(storeId: string, dto: CreateProductDto): Promise<Product> {
    const store = await getStoreRepository().findOneByOrFail({ id: storeId });
    const repo = getProductRepository();
    const product = repo.create({ ...dto, store, storeId: store.id });
    return repo.save(product);
  }

  async listByStore(storeId: string): Promise<Product[]> {
    return getProductRepository().find({ where: { storeId } });
  }
}
