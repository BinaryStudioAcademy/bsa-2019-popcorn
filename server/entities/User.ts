import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    location:string;

    @Column()
    aboutMe: string;
}