import { Voting } from "./VotingModel";
import { VotingOptionReaction } from "./VotingOptionReaction";

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    location:string;
    aboutMe: string;
    votings: Voting[];
    votingOptionReactions: VotingOptionReaction[];
}