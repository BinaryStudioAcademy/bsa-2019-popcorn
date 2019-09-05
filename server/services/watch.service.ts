import WatchRepository from "../repository/watch.repository";
import { getCustomRepository } from "typeorm";
import { getByIdValues as elasticGetByIdArray } from "../repository/movieElastic.repository";

interface IWatch {
  movieId: string;
  status: string;
}

export const getAllUserWatch = async (userId: string, next) => {
  const watches = await getCustomRepository(WatchRepository).getByUserId(
    userId,
    next
  );
  if (watches && watches.length === 0) {
    return [];
  }
  const movieIdArray = watches.map(watch => watch.movieId);
  const elasticResponse = await elasticGetByIdArray(movieIdArray);
  const movieArray = elasticResponse.hits.hits.map(movie => movie._source);
  const result = watches.map(watch => {
    const movie = movieArray.find(
      movieItem => String(movieItem.id) === watch.movieId
    );
    watch.movie = movie;
    watch.movieId = undefined;
    return watch;
  });
  return result;
};

export const getMoviesIdWatchList = (userId: string, next) =>
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

export const getWatchStatus = (userId: string, movieId: string, next) =>
  getCustomRepository(WatchRepository).getWatchStatus(userId, movieId, next);
