import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('int')
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ name: 'order_id' })
  orderId!: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ name: 'product_id' })
  productId!: string;
}
