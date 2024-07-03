import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Organization } from 'src/organizations/entities/organization.entity';

@Entity()
export class Task extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: String, nullable: false })
  title: string;

  @Column({ default: false })
  done: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  author: User;

  @ManyToOne(() => User, (user) => user.tasks)
  assignee: User;

  @ManyToOne(() => Organization, organization => organization.tasks)
  organization: Organization;
}
