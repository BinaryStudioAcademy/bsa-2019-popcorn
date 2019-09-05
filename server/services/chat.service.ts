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

export const updateMessage = async (id, body, next) => {
  return await getCustomRepository(ChatRepository).updateMessage(
    id,
    body,
    next
  );
};

export const deleteMessage = async (id, next) => {
  return await getCustomRepository(ChatRepository).deleteMessage(id, next);
};

export const readMessagesByChatId = async (chatId, userId, next) => {
  return await getCustomRepository(ChatRepository).readMessagesByChatId(
    chatId,
    userId,
    next
  );
};
