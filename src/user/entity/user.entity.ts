import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column('uuid')
  user_uuid: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  emailAddress: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isSoftDeleted: boolean;

  @CreateDateColumn() createdAt?: Date;

  @UpdateDateColumn() updatedAt?: Date;
}
