import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { SurveysQuestion } from "./SurveysQuestion";

@Entity()
export class Surveys {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(type => User, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(
    type => SurveysQuestion,
    surveysQuestion => surveysQuestion.surveys
  )
  surveysQuestion: SurveysQuestion[];

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
