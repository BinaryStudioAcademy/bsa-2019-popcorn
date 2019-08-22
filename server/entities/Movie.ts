import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 255
  })
  title: string;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column({
    length: 255
  })
  preview: string;
}
