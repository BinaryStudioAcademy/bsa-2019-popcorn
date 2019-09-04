import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column
} from "typeorm";
import { User } from "./User";
import { Chat } from "./Chat";
import { Story } from "./Story";

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

  @ManyToOne(type => Story, story => story.id, {
    onDelete: "CASCADE",
    nullable: true
  })
  story: Story;

  @Column({ nullable: true })
  reactionType: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
}
