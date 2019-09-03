import { Top } from "../models/TopModel";
import TopRepository from "../repository/top.repository";
import MovieInTopRepository from "../repository/movieInTop.repository";
import { getCustomRepository, Like } from "typeorm";
import * as movieService from "./movie.service";
import { getByIdValues } from "../repository/movieElastic.repository";

const getTopWithMovies = async (tops: any) => {
  const topWithMovies: any[] = Object.assign([], tops);

  for (let i = 0; i < topWithMovies.length; i++) {
    const top = topWithMovies[i];

    for (let j = 0; j < top.movieInTop.length; j++) {
      const movieInTop = top.movieInTop[j];

      movieInTop.movie = await movieService.getMovieById(movieInTop.movieId);
    }
  }

  return topWithMovies;
};

export const getTops = async (): Promise<Top[]> =>
  await getCustomRepository(TopRepository).find();

export const getExtendedTops = async (): Promise<Top[]> => {
  const tops = await getCustomRepository(TopRepository).find({
    relations: ["movieInTop", "user"],
    order: {
      created_at: "DESC"
    }
  });

  return await getMoviesInTops(tops, ["id", "title", "release_date"], 3);
};

const getMoviesInTops = async (
  tops: any,
  fields: Array<string>,
  limit: number
) => {
  const TopsWithMovies = [...tops];
  for (const top of TopsWithMovies) {
    const movieIds = top.movieInTop.map(top => top.movieId).splice(0, limit);
    const elasticResponse = await getByIdValues(movieIds);
    const movieArray = elasticResponse.hits.hits.map(movie => movie._source);
    top.movieInTop.slice(0, limit).forEach(item => {
      const movie = movieArray.find(movieItem => movieItem.id === item.movieId);
      if (!movie) return;
      item.movie = {};
      fields.forEach(field => {
        item.movie[field] = movie[field];
      });
    });
  }
  return TopsWithMovies;
};

export const getTopById = async (topId: string): Promise<Top> => {
  const top: Top = await getCustomRepository(TopRepository).findOne({
    relations: ["user", "movieInTop"],
    where: { id: topId }
  });

  const topsWithMovies = await getMoviesInTops(
    [top],
    ["id", "title", "release_date", "poster_path"],
    top.movieInTop.length
  );
  return topsWithMovies[0];
};

export const getTopByTitle = async (title: string): Promise<Top[]> => {
  const tops: Top[] = await getCustomRepository(TopRepository).find({
    relations: ["user", "movieInTop"],
    where: { title: Like(`%${title}%`) }
  });

  return await Promise.all(
    tops.map(async top => {
      const movieIds = top.movieInTop.map(movie => movie.movieId);
      const elasticResponse = await getByIdValues(movieIds);
      top.movieInTop = elasticResponse.hits.hits.map(movie => movie._source);
      return top;
    })
  );
};

export const getTopsByUserId = async (userId: string): Promise<any[]> => {
  const tops: Top[] = await getCustomRepository(TopRepository).find({
    relations: ["movieInTop"],
    where: { userId }
  });

  return await Promise.all(
    tops.map(async top => {
      const movieIds = top.movieInTop.map(movie => movie.movieId);
      const elasticResponse = await getByIdValues(movieIds);
      top.movieInTop = elasticResponse.hits.hits.map(movie => movie._source);
      return top;
    })
  );
};

export const createTop = async (top: Top): Promise<Top> =>
  await getCustomRepository(TopRepository).save(top);

export const createUserTop = async (top: any): Promise<any> => {
  const addedTop = {
    title: top.title,
    description: top.description || null,
    topImageUrl: top.topImageUrl || "",
    genreId: top.genreId || null,
    userId: top.userId
  };
  const createdTop: Top = await getCustomRepository(TopRepository).save(
    addedTop
  );

  await Promise.all(
    top.moviesList.map(async movieInTop => {
      const addedMovieInTop = {
        topId: createdTop.id,
        comment: movieInTop.comment,
        movieId: movieInTop.id
      };

      await getCustomRepository(MovieInTopRepository).save(addedMovieInTop);
    })
  );

  return await getTopById(createdTop.id);
};

export const updateTop = async (updatedTop: Top): Promise<Top> => {
  let top: Top = await getCustomRepository(TopRepository).findOne(
    updatedTop.id
  );
  top = updatedTop;
  return await getCustomRepository(TopRepository).save(top);
};

export const updateUserTop = async (updatedTop: any): Promise<any> => {
  let top: Top = await getCustomRepository(TopRepository).findOne(
    updatedTop.id
  );

  top.title = updatedTop.title;
  top.description = updatedTop.description;
  top.topImageUrl = updatedTop.topImageUrl;
  top.genreId = updatedTop.genreId;

  top = await getCustomRepository(TopRepository).save(top);

  const activeTop = await getTopById(top.id);

  for (let i = 0; i < activeTop.movieInTop.length; i++) {
    const movieInTop = await getCustomRepository(MovieInTopRepository).findOne(
      activeTop.movieInTop[i].id
    );

    await getCustomRepository(MovieInTopRepository).remove(movieInTop);
  }

  for (let i = 0; i < updatedTop.moviesList.length; i++) {
    const movieInTop: any = {};
    movieInTop.comment = updatedTop.moviesList[i].comment;
    movieInTop.topId = top.id;
    movieInTop.movieId = updatedTop.moviesList[i].id;

    await getCustomRepository(MovieInTopRepository).save(movieInTop);
  }

  return await getTopById(top.id);
};

export const deleteTopById = async (topId: string): Promise<Top> => {
  const top = await getCustomRepository(TopRepository).findOne(topId);
  return await getCustomRepository(TopRepository).remove(top);
};
