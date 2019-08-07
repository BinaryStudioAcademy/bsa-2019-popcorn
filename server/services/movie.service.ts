import {Movie} from '../models/MovieModel';
import MovieRepository from '../repository/movie.repository';
import {getCustomRepository, Like} from "typeorm";

export const createMovie = async (movie: Movie): Promise<Movie> => {
    return await getCustomRepository(MovieRepository)
        .save(movie);
};

export const getMovies = async (): Promise<Movie[]> => {
    return await getCustomRepository(MovieRepository)
        .find();
};

export const getById = async (id): Promise<Movie> => {
    return await getCustomRepository(MovieRepository)
    .findOne({id});
}

export const getByTitle = async (title:string): Promise<Movie[]> => {
    return await getCustomRepository(MovieRepository)
	.find({where: {title: Like('%'+title+'%')}});
}

export const getByMovieYear = async (year:number): Promise<Movie[]> => {
    return await getCustomRepository(MovieRepository)
        .find({where: {year}});
};