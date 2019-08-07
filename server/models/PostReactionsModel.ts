import {Post} from "./PostModel";
import {User} from "./UserModel";

export class PostReactions{
    id: string;
    smile: boolean;
    post: Post;
    user: User;
}