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

  async getChatById(chatId, next?) {
    const chat = await this.findOne({
      where: [{ id: chatId }],
      relations: ["user1", "user2", "messages", "messages.user"]
    });
    const formatChat: any = {};
    formatChat.id = chat.id;
    formatChat.user1 = this.formatUser(chat.user1);
    formatChat.user2 = this.formatUser(chat.user2);
    formatChat.messages = chat.messages.sort((a, b) =>
      a.created_at > b.created_at ? 1 : -1
    );
    formatChat.messages.forEach(message => {
      message.user = this.formatUser(message.user);
    });
    return formatChat;
  }
}

export default ChatRepository;
