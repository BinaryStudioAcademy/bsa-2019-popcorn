import TMovie from './TMovie';

const getGenre = (genres): Array<string> =>
	genres.map(genre => (genre ? genre.name : ''));

export default (movie: any): TMovie => {
	return {
		id: movie.id,
		poster_path: movie.poster_path, //todo
		runtime: movie.runtime,
		title: movie.title,
		release_date: movie.release_date,
		genres: getGenre(movie.genres),
		overview: movie.overview,
		budget: movie.budget,
		vote_average: 3.5
	};
};
