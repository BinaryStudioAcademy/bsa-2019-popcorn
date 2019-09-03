import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column
} from "typeorm";
import { User } from "./User";
import { Chat } from "./Chat";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  body: string;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(type => Chat, chat => chat.id, { onDelete: "CASCADE" })
  chat: Chat;

  @ManyToOne(type => User, user => user.id, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
}
