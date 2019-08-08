import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class PostComments {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @ManyToOne(type => User, user => user.id)
    user: User;

    @ManyToOne(type => Post, post => post.id)
    post: Post;
}