import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Follower {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => User, user => user.id)
  user: User;

  @ManyToOne(type => User, user => user.id)
  follower: User;

  @CreateDateColumn({ type: "timestamp" })
  followed_at: Date;
}
