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

  @Column()
  backgroundColor: string;

  @Column({ nullable: true })
  fontColor: string;

  @Column({ nullable: true })
  testPositionX: number;

  @Column({ nullable: true })
  testPositionY: number;

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
