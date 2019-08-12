import {User} from "./UserModel";
import {PostCommentsModel as PostComment} from './PostCommentsModel.js'
export class Post {
   id: string;
   title: string;
   description: string;
   image_url: string;
   user: User;
   comments: PostComment[]
}