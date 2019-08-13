import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from "typeorm";

import { User } from "../User";
import { Movie } from "../Movie";
import { EventComment } from "./EventComment";
import { EventVisitor } from "./EventVisitor";

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location_lat: number;

  @Column()
  location_lng: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  isPrivate: boolean;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(type => Movie)
  @JoinColumn()
  movie: Movie;

  @Column()
  userId: string;

  @Column()
  movieId: string;

  @OneToMany(type => EventComment, event_comment => event_comment.event)
  @JoinColumn()
  eventComments: EventVisitor[];

  @OneToMany(type => EventVisitor, event_visitor => event_visitor.event)
  @JoinColumn()
  eventVisitors: EventVisitor[];
}
