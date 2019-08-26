import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../User";
import { Review } from "./Review";

@Entity()
export class ReviewReaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  isLike: boolean;

  @ManyToOne(type => Review, review => review.id, {
    onDelete: "CASCADE"
  })
  review: Review;

  @ManyToOne(type => User, user => user.id, {
    onDelete: "CASCADE"
  })
  user: User;
}
