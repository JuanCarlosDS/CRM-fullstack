import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Organization } from 'src/organizations/entities/organization.entity';
//   import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'decimal' })
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.products)
    user: User;

    @ManyToOne(() => Organization, organization => organization.products)
    organization: Organization;
    
    // @ManyToOne(() => Category, (category) => category.products)
    // category: Category;
}
