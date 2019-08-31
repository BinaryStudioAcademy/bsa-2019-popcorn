import { User } from "./UserModel";
import { Chat } from "./ChatModel";

export class Message {
  id: string;
  body: string;
  created_at: Date;
  user: User;
  chat: Chat;
}
