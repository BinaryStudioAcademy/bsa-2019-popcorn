import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class PostReactions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    smile:boolean;

    @OneToOne(type => Post, post => post.id)
    @JoinColumn()
    postId: Post;

    @OneToOne(type => User, user => user.id)
    @JoinColumn()
    userId: User;
}