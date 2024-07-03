import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Organization } from 'src/organizations/entities/organization.entity';

@Entity()
export class Booking extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;
    
    @Column({ type: String, nullable: false })
    title: string;

    @ManyToOne(() => User, (user) => user.bookings)
    assignee: User;

    @Index()
    @Column({ type: String, nullable: true })
    description: string | null;

    @UpdateDateColumn()
    updatedAt?: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @Column({ type: 'timestamp', nullable: true })
    startTime: Date;
    
    @Column({ type: 'timestamp', nullable: true })
    endTime: Date;

    @ManyToOne(() => User, (user) => user.bookings)
    user: User;

    @ManyToOne(() => Organization, organization => organization.bookings)
    organization: Organization;
}
