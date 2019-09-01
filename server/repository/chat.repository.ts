import {
  EntityRepository,
  Repository,
  getCustomRepository,
  createQueryBuilder
} from "typeorm";
import { Chat } from "../entities/Chat";
import UserRepository from "./user.repository";

@EntityRepository(Chat)
class ChatRepository extends Repository<Chat> {
  async getChatsByUser(user, next?) {
    const chats = await this.find({
      where: [{ user1: user }, { user2: user }],
      relations: ["user1", "user2", "messages"]
    });
    return chats.map(chat => {
      const formatChat: any = {};
      formatChat.id = chat.id;
      formatChat.user =
        chat.user1.id === user.id
          ? this.formatUser(chat.user1)
          : this.formatUser(chat.user2);
      formatChat.lastMessage = chat.messages.sort((a, b) =>
        a.created_at < b.created_at ? 1 : -1
      )[0];
      return formatChat;
    });
  }

  formatUser = user => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar
  });

  async getMessagesByChatId(chatId, next?) {
    const chat = await this.findOne({
      where: [{ id: chatId }],
      relations: ["messages", "messages.user"]
    });
    const messages = [...chat.messages];
    messages.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
    messages.forEach((message: any) => {
      message.user = this.formatUser(message.user);
    });
    return messages;
  }
}

export default ChatRepository;
