import {Top} from './TopModel';

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    location:string;
    aboutMe: string;
    tops: Top[];
}