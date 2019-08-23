import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Top } from "./Top";

@Entity()
export class MovieInTop {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  comment: string;

  @Column()
  topId: string;

  @Column()
  movieId: number;

  @ManyToOne(type => Top, top => top.movieInTop, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  top: Top;
}
