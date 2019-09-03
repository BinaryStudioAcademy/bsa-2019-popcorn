import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  OneToMany
} from "typeorm";

import { User } from "./User";
import { Surveys } from "./Surveys";
import { Top } from "./Top";
import { Event } from "./Events";
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

  @ManyToOne(type => User, user => user.id, { cascade: true })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(type => Surveys, survey => survey.id, { nullable: true })
  @JoinColumn()
  survey: Surveys;

  @ManyToOne(type => Event, event => event.id, { nullable: true })
  @JoinColumn()
  event: Event;

  @ManyToOne(type => Top, top => top.id, { nullable: true })
  @JoinColumn()
  top: Top;

  @Column()
  createdAt: Date;

  @OneToMany(type => PostComments, post_comments => post_comments.post)
  @JoinTable()
  comments: PostComments[];

  @OneToMany(type => PostReactions, post_reactions => post_reactions.post)
  @JoinTable()
  reactions: PostReactions[];
}
