import { User } from "../UserModel";
import { Review } from "./ReviewModel";

export class ReviewReaction {
  id: string;
  isLike: boolean;
  user: User;
  review: Review;
}
