import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    year: number;

    @Column()
    description: string;

    @Column()
    duration: number;

    @Column()
    preview: string;
}