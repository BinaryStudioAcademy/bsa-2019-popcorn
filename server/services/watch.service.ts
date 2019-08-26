import WatchRepository from "../repository/watch.repository";
import { getCustomRepository } from "typeorm";

interface IWatch {
  movieId: string;
  status: string;
}

export const getAllUserWatch = (userId: string, next) =>
  getCustomRepository(WatchRepository).getByUserId(userId, next);

export const saveNewUserWatch = (userId: string, watch: IWatch, next) => {
  const { status } = watch;
  if (status === "watched" || status === "to_watch") {
    return getCustomRepository(WatchRepository).saveByUserId(
      userId,
      watch,
      next
    );
  }
  return next({ status: 404, message: "Invalid format for status" }, null);
};

export const deleteWatch = (watchId: string, next) =>
  getCustomRepository(WatchRepository).deleteById(watchId, next);

export const changeWatchStatus = (watchId: string, next) =>
  getCustomRepository(WatchRepository).changeStatus(watchId, next);
