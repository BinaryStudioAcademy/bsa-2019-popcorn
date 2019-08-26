import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index
} from "typeorm";
import { User } from "./User";

@Entity()
@Index(["user", "movieId"], { unique: true })
export class Watch {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP"
  })
  created_at: Date;

  @Column({ nullable: false })
  movieId: string;

  @Column("text", { nullable: false })
  status: Status;

  @ManyToOne(type => User, user => user.id, {
    onDelete: "CASCADE"
  })
  user: User;
}

enum Status {
  ToWatch = "to_watch",
  Watched = "watched"
}
