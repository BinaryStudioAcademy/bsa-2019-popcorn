import { User } from "./UserModel";
import { VotingOption } from "./VotingOptionModel";

export class Voting {
  id: string;
  header: string;
  user: User;
  deltaPositionHeadX: number;
  deltaPositionHeadY: number;
  deltaPositionOptionBlockX: number;
  deltaPositionOptionBlockY: number;
  backColor: string;
  backImage: string;
  votingOptions: VotingOption[];
}
