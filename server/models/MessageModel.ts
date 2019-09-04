import { User } from "./UserModel";
import { Chat } from "./ChatModel";
import { Story } from "./StoryModel";

export class Message {
  id: string;
  body: string;
  created_at: Date;
  isRead: boolean;
  user: User;
  chat: Chat;
  story: Story;
  reactionType: string;
}
