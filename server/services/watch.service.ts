import WatchRepository from "../repository/watch.repository";
import { getCustomRepository } from "typeorm";

interface IWatch {
  movieId: string;
  status: Status;
}

enum Status {
  ToWatch = "to_watch",
  Watched = "watched"
}

export const getAllUserWatch = (userId: string, next) =>
  getCustomRepository(WatchRepository).getByUserId(userId, next);

export const saveNewUserWatch = (userId: string, watch: IWatch, next) =>
  getCustomRepository(WatchRepository).saveByUserId(userId, watch, next);
