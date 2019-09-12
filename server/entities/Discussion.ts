import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => User, user => user.id, { onDelete: "CASCADE" })
  user: User;

  @Column()
  text: string;

  @Column()
  createdAt: Date;

  @Column()
  userId: string;

  @Column()
  movieId: string;
}
