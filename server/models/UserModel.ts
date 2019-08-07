import { Voting } from "./VotingModel";

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    location:string;
    aboutMe: string;
    votings: Voting[]
}