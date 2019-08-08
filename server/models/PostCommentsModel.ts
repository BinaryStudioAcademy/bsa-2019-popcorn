import {Post} from "./PostModel";
import {User} from "./UserModel";

export class PostCommentsModel{
    id: string;
    user: User;
    post: Post;
    text: string;
}