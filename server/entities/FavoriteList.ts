import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class FavoriteList {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  movieId: number;

  @ManyToOne(type => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  user: User;
}
