import { User } from "./UserModel";
import { VotingOption } from "./VotingOptionModel";

export class Voting {
  id: string;
  body: string;
  user: User;
  votingOptions: VotingOption[]
}