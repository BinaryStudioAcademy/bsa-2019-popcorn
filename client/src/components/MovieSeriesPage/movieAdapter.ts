import TMovie from './TMovie';
import config from '../../config';

export default (movie: any): TMovie => {
	return {
		id: movie.id,
		poster_path: config.POSTER_PATH + movie.poster_path,
		runtime: movie.runtime,
		title: movie.title,
		release_date: movie.release_date,
		genres: 'Action, Drama, Horror', //getGenre(movie.genres),
		overview: movie.overview,
		budget: movie.budget,
		vote_average: movie.rate,
		video: `https://www.youtube.com/embed/${movie.video_link}`,
		hasVideo: !!movie.video_link,
		cast: 'Matt Damon, Jessica Chastain, Kristen Wiig',
		messages: movie.messages,
		imdb_id: movie.imdb_id
	};
};
