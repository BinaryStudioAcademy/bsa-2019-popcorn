import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {SurveysQuestion} from "./SurveysQuestion";
import {SurveysQuestionAnswer} from "./SurveysQuestionAnswer";

@Entity()
export class SurveysQuestionOption {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @ManyToOne(type => SurveysQuestion, { onDelete: 'CASCADE' })
    surveysQuestion: SurveysQuestion;

    @OneToMany(type => SurveysQuestionAnswer, surveysOptionAnswer => surveysOptionAnswer.surveysQuestionOption)
    surveysOptionAnswer: SurveysQuestionAnswer[];
}