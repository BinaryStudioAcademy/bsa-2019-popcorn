import ChatRepository from "../repository/chat.repository";
import { getCustomRepository } from "typeorm";

export const getChatsByUser = async (user, next) => {
  return await getCustomRepository(ChatRepository).getChatsByUser(user, next);
};

export const getMessagesByChatId = async (chatId, next) => {
  return await getCustomRepository(ChatRepository).getMessagesByChatId(
    chatId,
    next
  );
};

export const createChat = async (user1Id, user2Id, next) => {
  return await getCustomRepository(ChatRepository).createChat(
    user1Id,
    user2Id,
    next
  );
};

export const createMessage = async (chatId, userId, body, next) => {
  return await getCustomRepository(ChatRepository).createMessage(
    chatId,
    userId,
    body,
    next
  );
};
