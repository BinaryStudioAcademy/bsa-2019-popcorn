import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Story {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  image_url: string;

  @Column({ default: "" })
  caption: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;
}
