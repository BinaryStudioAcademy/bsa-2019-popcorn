import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "./User";

@Entity()
export class NotificationToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  token: string;

  @ManyToOne(type => User, user => user.id)
  user: User;
}
