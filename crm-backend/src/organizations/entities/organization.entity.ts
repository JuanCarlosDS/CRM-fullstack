import { Article } from "src/articles/entities/article.entity";
import { Booking } from "src/bookings/entities/booking.entity";
import { Product } from "src/products/entities/product.entity";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Organization extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ length: 500 })
    name: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Index()
    @Column({ nullable: true })
    email: string;

    @Column('text', { nullable: true })
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => User, user => user.organization)
    users: User[];

    @OneToMany(() => Article, article => article.organization)
    articles: Article[];

    @OneToMany(() => Task, task => task.organization)
    tasks: Task[];

    @OneToMany(() => Product, product => product.organization)
    products: Product[];

    @OneToMany(() => Booking, booking => booking.organization)
    bookings: Booking[];
}