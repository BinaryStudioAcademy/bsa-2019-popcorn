import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "./User";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  img: string;

  @Column({ nullable: true })
  url: string;

  @Column()
  type: string;

  @Column()
  isRead: boolean;

  @Column()
  date: Date;

  @ManyToOne(type => User, user => user.id)
  user: User;

  @Column()
  userId: string;
}
