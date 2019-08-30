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

  @Column({ default: "rgba(255, 255, 255, 1)" })
  backgroundColor: string;

  @Column({ nullable: true, default: "rgba(0, 0, 0, 1)" })
  fontColor: string;

  @Column({ nullable: true, default: 0 })
  textPositionX: number;

  @Column({ nullable: true, default: 0 })
  textPositionY: number;

  @Column({ nullable: true })
  activityId: string;

  @ManyToOne(type => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  movieId: string;

  @Column({ nullable: true })
  movieOption: string;
}
