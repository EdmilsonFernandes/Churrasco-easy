import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Store } from './Store';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @OneToMany(() => Store, (store) => store.owner)
  stores!: Store[];
}
