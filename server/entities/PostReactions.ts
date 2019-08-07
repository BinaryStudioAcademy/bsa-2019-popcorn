import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class PostReactions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    smile:boolean;

    @OneToOne(type => Post)
    @JoinColumn()
    post: Post;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;
}