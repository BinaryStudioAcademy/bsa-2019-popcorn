import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { MovieInTop } from "./MovieInTop";

@Entity()
export class Top {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: "" })
  topImageUrl: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @Column({ nullable: true })
  genreId: string;

  @Column({ nullable: true })
  userId: string;

  @OneToMany(type => MovieInTop, movieInTop => movieInTop.top)
  movieInTop: MovieInTop[];

  @ManyToOne(type => User, user => user.tops)
  user: User;
}
