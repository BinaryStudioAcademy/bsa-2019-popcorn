import { Post } from "./PostModel";
import { User } from "./UserModel";

export class PostReactions {
  id: string;
  type: string;
  post: Post;
  user: User;
}
