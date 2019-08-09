import { VotingOption } from "./VotingOptionModel";
import { User } from "./UserModel";

export class VotingOptionReaction {
  id: string;
  isChosen: boolean;
  votingOption: VotingOption;
  user: User;
}