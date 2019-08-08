import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    location:string;

    @Column({ nullable: true })
    aboutMe: string;
}