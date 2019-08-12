import {Top} from './TopModel';
import {Story} from './StoryModel';
import {Surveys} from './SurveysModel';
import {SurveysQuestionAnswer} from './SurveysQuestionAnswer';

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    location:string;
    aboutMe: string;
    tops: Top[];
    stories: Story[];
    surveys: Surveys[];
    surveysQuestionAnswer: SurveysQuestionAnswer[];
}