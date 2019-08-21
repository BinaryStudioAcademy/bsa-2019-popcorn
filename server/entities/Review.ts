import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP"
  })
  created_at: Date;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  movieId: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;
}
