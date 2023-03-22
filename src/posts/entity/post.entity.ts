import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class PostyEntity {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ type: 'varchar', nullable: false })
  user_uuid: string;

  @Column({ type: 'integer', nullable: false })
  categoryId: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  content: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isSoftDeleted: boolean;

  @CreateDateColumn() createdAt?: Date;

  @UpdateDateColumn() updatedAt?: Date;
}
