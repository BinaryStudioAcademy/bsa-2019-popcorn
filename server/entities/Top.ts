import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './User';

@Entity()
export class Top {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    genreId: string;

    @Column({ nullable: true })
    userId: string;

    @ManyToOne(type => User, user => user.tops)
    user: User;
}