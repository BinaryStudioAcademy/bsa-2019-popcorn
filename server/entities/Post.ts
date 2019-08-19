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

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  extraTitle: string;

  @Column()
  extraLink: string;

  @ManyToOne(type => User, user => user.id)
  user: User;

  @ManyToMany(type => PostComments, post_comments => post_comments.post.id)
  @JoinTable()
  comments!: PostComments[];
}
