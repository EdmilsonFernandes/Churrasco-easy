import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Store } from './Store';

@Entity({ name: 'store_settings' })
export class StoreSettings {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column({ name: 'primary_color', default: '#cc0000' })
  primaryColor!: string;

  @Column({ name: 'secondary_color', nullable: true })
  secondaryColor?: string;

  @OneToOne(() => Store, (store) => store.settings)
  @JoinColumn({ name: 'store_id' })
  store!: Store;

  @Column()
  storeId!: string;
}
