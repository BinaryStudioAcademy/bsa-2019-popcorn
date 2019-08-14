import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./User";
import {SurveysQuestion} from "./SurveysQuestion";
import {SurveysQuestionOption} from "./SurveysQuestionOption";

@Entity()
export class SurveysQuestionAnswer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    value: string;

    @ManyToOne(type => SurveysQuestion, { onDelete: 'CASCADE' })
    surveysQuestion: SurveysQuestion;
    
    @ManyToOne(type => SurveysQuestionOption, { onDelete: 'CASCADE', nullable: true })
    surveysQuestionOption: SurveysQuestionOption;

    @ManyToOne(type => User, { onDelete: 'CASCADE' })
    user: User;     
}