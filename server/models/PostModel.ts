import {User} from "./UserModel";
export class Post {
   id: string;
   title: string;
   description: string;
   image_url: string;
   user: User;
}