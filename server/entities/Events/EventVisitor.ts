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
export class EventVisitor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(type => Event, event => event.eventVisitors)
  @JoinColumn()
  event: string;

  @Column()
  status: string;

  @Column()
  userId: string;

  @Column()
  eventId: string;
}
