import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class PostReactions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  smile: boolean;

  @ManyToOne(type => Post, post => post.id)
  post: Post;

  @ManyToOne(type => User, user => user.id)
  user: User;
}
