import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class MovieRate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @ManyToOne(type => User, user => user.id)
  user: User;

  @Column()
  movieId: string;

  @Column()
  rate: number;
}
