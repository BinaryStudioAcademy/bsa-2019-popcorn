import FavoriteListRepository from "../repository/favoriteList.repository";
import { getCustomRepository } from "typeorm";

export const updateFavoriteMoviesByUserId = async (
  id: string,
  movieIds: Array<number>,
  next
) => {
  await getCustomRepository(
    FavoriteListRepository
  ).updateFavoriteMoviesByUserId(id, movieIds, next);
};
