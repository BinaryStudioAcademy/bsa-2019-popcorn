import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Surveys } from "./Surveys";
import { SurveysQuestionOption } from "./SurveysQuestionOption";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";

@Entity()
export class SurveysQuestion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  firstLabel: string;

  @Column({ nullable: true })
  lastLabel: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  required: boolean;

  @ManyToOne(type => Surveys, { onDelete: "CASCADE" })
  surveys: Surveys;

  @OneToMany(
    type => SurveysQuestionOption,
    surveysQuestionOption => surveysQuestionOption.surveysQuestion
  )
  surveysQuestionOption: SurveysQuestionOption[];

  @OneToMany(
    type => SurveysQuestionAnswer,
    surveysQuestionAnswer => surveysQuestionAnswer.surveysQuestion
  )
  surveysQuestionAnswer: SurveysQuestionAnswer[];
}
