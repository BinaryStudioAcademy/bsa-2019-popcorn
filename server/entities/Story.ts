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

  @Column({ nullable: true })
  image_url: string;

  @Column({ default: "" })
  caption: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  activityId: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  filmId: string;

  @Column({ nullable: true })
  movieOption: string;
}
