import { CreateOrderDto } from '../dto/CreateOrderDto';
import { getOrderRepository } from '../repositories/OrderRepository';
import { getProductRepository } from '../repositories/ProductRepository';
import { getStoreRepository } from '../repositories/StoreRepository';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';

export class OrderService {
  async create(storeId: string, dto: CreateOrderDto): Promise<Order> {
    const store = await getStoreRepository().findOneByOrFail({ id: storeId });
    const productRepo = getProductRepository();
    const orderRepo = getOrderRepository();

    const items: OrderItem[] = [];
    for (const payload of dto.items) {
      const product = await productRepo.findOneByOrFail({ id: payload.productId, storeId });
      const item = new OrderItem();
      item.product = product;
      item.productId = product.id;
      item.quantity = payload.quantity;
      item.price = Number(product.price) * payload.quantity;
      items.push(item);
    }

    const order = orderRepo.create({
      customerName: dto.customerName,
      customerPhone: dto.customerPhone,
      store,
      storeId: store.id,
      items,
    });
    return orderRepo.save(order);
  }

  async list(storeId: string): Promise<Order[]> {
    return getOrderRepository().find({ where: { storeId }, relations: ['items', 'items.product'] });
  }
}
