import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { StoreSettings } from './StoreSettings';
import { Product } from './Product';
import { Order } from './Order';

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @ManyToOne(() => User, (user) => user.stores)
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @Column({ name: 'owner_id' })
  ownerId!: string;

  @Column({ name: 'is_open', default: true })
  isOpen!: boolean;

  @OneToOne(() => StoreSettings, (settings) => settings.store, { cascade: true })
  settings!: StoreSettings;

  @OneToMany(() => Product, (product) => product.store)
  products!: Product[];

  @OneToMany(() => Order, (order) => order.store)
  orders!: Order[];
}
