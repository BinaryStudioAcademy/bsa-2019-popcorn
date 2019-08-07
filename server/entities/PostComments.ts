import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class PostComments {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToOne(type => Post)
    @JoinColumn()
    post: Post;
}