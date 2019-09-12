import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "../User";
import { Event } from "./Event";

@Entity()
export class EventComment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => User, user => user.id, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ManyToOne(type => Event, event => event.eventComments)
  @JoinColumn()
  event: string;

  @Column()
  text: string;

  @Column()
  createdAt: Date;

  @Column()
  userId: string;

  @Column()
  eventId: string;
}
