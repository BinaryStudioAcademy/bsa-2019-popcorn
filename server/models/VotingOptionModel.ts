import { Voting } from "./VotingModel";
import { VotingOptionReaction } from "./VotingOptionReaction";

export class VotingOption {
  id: string;
  body: string;
  voting: Voting;
  votingOptionReactions: VotingOptionReaction[];
}
