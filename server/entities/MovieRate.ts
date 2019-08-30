import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MovieRate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  movieId: string;

  @Column()
  rate: number;
}
