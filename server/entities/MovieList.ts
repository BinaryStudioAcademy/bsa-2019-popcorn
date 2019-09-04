import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class MovieList {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: false })
  isPrivate: boolean;

  @ManyToOne(type => User, user => user.id, {
    onDelete: "CASCADE"
  })
  user: User;

  @Column({ type: "text", array: true, nullable: true, unique: false })
  moviesId: string[];
}
