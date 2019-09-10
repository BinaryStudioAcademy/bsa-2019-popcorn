import { VotingOption } from "./VotingOptionModel";
import { User } from "./UserModel";
import { Voting } from "./VotingModel";

export class VotingOptionReaction {
  id: string;
  votingOption: VotingOption;
  voting: Voting;
  user: User;
}
