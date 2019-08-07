import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Story {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    image_url: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;
}