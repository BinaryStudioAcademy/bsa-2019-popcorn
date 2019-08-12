import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Top } from './Top';
import {Story} from './Story';
import {Surveys} from './Surveys';
import {SurveysQuestionAnswer} from './SurveysQuestionAnswer';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    location:string;

    @Column()
    aboutMe: string;

    @OneToMany(type => Top, top => top.user)
    tops: Top[];

    @OneToMany(type => Story, story=> story.user)
    stories: Story[];

    @OneToMany(type => Surveys, surveys => surveys.user)
    surveys: Surveys[];

    @OneToMany(type => SurveysQuestionAnswer, surveysQuestionAnswer => surveysQuestionAnswer.user)
    surveysQuestionAnswer: SurveysQuestionAnswer[];
}