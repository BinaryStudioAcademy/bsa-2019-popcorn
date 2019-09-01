import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Message } from "./Message";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => User, user => user.id, { onDelete: "CASCADE" })
  user1: User;

  @ManyToOne(type => User, user => user.id, { onDelete: "CASCADE" })
  user2: User;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];
}
