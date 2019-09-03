import {
  EntityRepository,
  Repository,
  getCustomRepository,
  createQueryBuilder
} from "typeorm";
import { Chat } from "../entities/Chat";
import UserRepository from "./user.repository";
import MessageRepository from "./message.repository";

@EntityRepository(Chat)
class ChatRepository extends Repository<Chat> {
  async getChatsByUser(userId, next?) {
    const user = await getCustomRepository(UserRepository).findOne({
      id: userId
    });
    const chats = await this.find({
      where: [{ user1: user }, { user2: user }],
      relations: ["user1", "user2", "messages"]
    });
    return chats.map(chat => {
      const formatChat: any = {};
      formatChat.id = chat.id;
      formatChat.user =
        chat.user1.id !== userId
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

  async createChat(user1Id, user2Id, next?) {
    const user1 = await getCustomRepository(UserRepository).findOne({
      id: user1Id
    });
    const user2 = await getCustomRepository(UserRepository).findOne({
      id: user2Id
    });
    const chat = await this.findOne({
      where: [{ user1, user2 }, { user1: user2, user2: user1 }]
    });
    if (!chat) {
      await this.save({ user1, user2 });
    }
    const newChat = await this.findOne({
      where: [{ user1, user2 }, { user1: user2, user2: user1 }]
    });
    return { chatId: newChat.id };
  }

  async createMessage(chatId, userId, body, next?) {
    const chat = await this.findOne({ id: chatId });
    const user = await getCustomRepository(UserRepository).findOne({
      id: userId
    });
    const newMessage: any = await getCustomRepository(MessageRepository).save({
      chat,
      user,
      body
    });
    newMessage.user = this.formatUser(newMessage.user);
    return newMessage;
  }

  async deleteMessage(id, next?) {
    const {
      user: { id: userId },
      chat: { id: chatId }
    } = await getCustomRepository(MessageRepository).findOne({
      where: [{ id }],
      relations: ["chat", "user"]
    });
    await getCustomRepository(MessageRepository).delete(id);
    return { userId, chatId };
  }

  async updateMessage(id, body, next?) {
    const {
      user: { id: userId },
      chat: { id: chatId }
    } = await getCustomRepository(MessageRepository).findOne({
      where: [{ id }],
      relations: ["chat", "user"]
    });
    await getCustomRepository(MessageRepository).update(id, { body });
    const message: any = await getCustomRepository(MessageRepository).findOne({
      where: [{ id }],
      relations: ["user"]
    });
    message.user = this.formatUser(message.user);
    return { userId, chatId, message };
  }

  async readMessagesByChatId(chatId, userId, next?) {
    await getCustomRepository(MessageRepository)
      .createQueryBuilder("message")
      .leftJoin("message.chat", "chat")
      .where("chat.id = :id", { id: chatId })
      .leftJoin("message.user", "user")
      .where("user.id != :id", { id: userId })
      .andWhere("isRead = :isRead", { isRead: false })
      .update()
      .set({ isRead: true })
      .execute();
    return {};
  }
}

export default ChatRepository;
