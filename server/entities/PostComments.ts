import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class PostComments {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @OneToOne(type => User, user => user.id)
    @JoinColumn()
    user: User;

    @OneToOne(type => Post, post => post.id)
    @JoinColumn()
    post: Post;
}