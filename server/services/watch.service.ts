import WatchRepository from "../repository/watch.repository";
import { getCustomRepository } from "typeorm";

export const getAllUserWatch = (userId: string, next) =>
  getCustomRepository(WatchRepository).getByUserId(userId, next);
