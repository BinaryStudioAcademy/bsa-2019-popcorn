import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany
} from "typeorm";

import { User } from "./User";
import { PostComments } from "./PostComments";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "" })
  title: string;

  @Column({ default: "" })
  description: string;

  @Column()
  image_url: string;

  @Column({ nullable: true })
  extraTitle: string;

  @Column({ nullable: true })
  extraLink: string;

  @ManyToOne(type => User, user => user.id)
  user: User;

  @Column()
  userId: string;

  @ManyToMany(type => PostComments, post_comments => post_comments.post.id)
  @JoinTable()
  comments!: PostComments[];
}
