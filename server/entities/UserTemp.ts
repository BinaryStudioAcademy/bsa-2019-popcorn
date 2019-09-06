import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserTemp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userId: string;

  @Column()
  token: string;
}
