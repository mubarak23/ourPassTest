import { UserEntity } from 'src/user/entity/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ type: 'varchar', nullable: false })
  user_uuid: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  description: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isSoftDeleted: boolean;

  @CreateDateColumn() createdAt?: Date;

  @UpdateDateColumn() updatedAt?: Date;
}
