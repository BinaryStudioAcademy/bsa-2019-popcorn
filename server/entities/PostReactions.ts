import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class PostReactions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: string;

  @ManyToOne(type => Post, post => post.id, {
    onDelete: "CASCADE"
  })
  post: Post;

  @ManyToOne(type => User, user => user.id, {
    onDelete: "CASCADE"
  })
  user: User;
}
