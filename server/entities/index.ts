import { User } from './User';
import { Post } from './Post';
import { PostReactions } from "./PostReactions";
import { PostComments } from "./PostComments";
import { Movie } from './Movie';
import { Top } from './Top';
import {Story} from "./Story";
import { Event, EventComment, EventVisitor } from './Events';
import {Surveys} from './Surveys';
import {SurveysQuestion} from './SurveysQuestion';
import {SurveysQuestionAnswer} from './SurveysQuestionAnswer';
import {SurveysQuestionOption} from './SurveysQuestionOption';


export default [
    User,
    Post,
    PostReactions,
    PostComments,
    Movie,
    Top,
    Story,
    Event,
    EventComment,
    EventVisitor,
    Surveys, 
    SurveysQuestion, 
    SurveysQuestionAnswer,
    SurveysQuestionOption
];
