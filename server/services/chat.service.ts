import ChatRepository from "../repository/chat.repository";
import { getCustomRepository } from "typeorm";

export const getChatsByUser = async (user, next) => {
  return await getCustomRepository(ChatRepository).getChatsByUser(user, next);
};

export const getChatById = async (chatId, next) => {
  return await getCustomRepository(ChatRepository).getChatById(chatId, next);
};
