import { Top } from "../models/TopModel";
import TopRepository from "../repository/top.repository";
import { getCustomRepository } from "typeorm";
import * as movieService from "./movie.service";

export const getTops = async (): Promise<Top[]> =>
  await getCustomRepository(TopRepository).find();

export const getTopById = async (topId: number): Promise<Top> =>
  await getCustomRepository(TopRepository).findOne(topId);

export const getTopsByUserId = async (userId: string): Promise<any[]> => {
  const tops: Top[] = await getCustomRepository(TopRepository).find({
    relations: ['movieInTop'],
    where: { userId }
  });

  const topWithMovies: any[] = Object.assign([], tops);

  for (let i = 0; i < topWithMovies.length; i++) {
    const top = topWithMovies[i];

    for (let j = 0; j < top.movieInTop.length; j++) {
      const movieInTop = top.movieInTop[j];

      movieInTop.movie = await movieService.getMovieById(movieInTop.movieId);
    }
  }
  
  return topWithMovies;
}

export const createTop = async (top: Top): Promise<Top> =>
  await getCustomRepository(TopRepository).save(top);

export const updateTop = async (updatedTop: Top): Promise<Top> => {
  let top: Top = await getCustomRepository(TopRepository).findOne(
    updatedTop.id
  );
  top = updatedTop;
  return await getCustomRepository(TopRepository).save(top);
};

export const deleteTopById = async (topId: number): Promise<Top> => {
  const top = await getCustomRepository(TopRepository).findOne(topId);
  return await getCustomRepository(TopRepository).remove(top);
};
