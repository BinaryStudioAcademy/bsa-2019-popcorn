import { VotingOption } from "./VotingOptionModel";
import { User } from "./UserModel";

export class VotingOptionReaction {
  id: string;
  votingOption: VotingOption;
  user: User;
}
