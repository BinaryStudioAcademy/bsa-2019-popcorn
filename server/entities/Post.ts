import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  OneToMany
} from "typeorm";

import { User } from "./User";
import { PostComments } from "./PostComments";
import { PostReactions } from "./PostReactions";

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

  @Column({ nullable: true })
  createdAt: Date;

  @OneToMany(type => PostComments, post_comments => post_comments.post)
  @JoinTable()
  comments: PostComments[];

  @OneToMany(type => PostReactions, post_reactions => post_reactions.post)
  @JoinTable()
  reactions: PostReactions[];
}
