import TMovie from './TMovie';
import config from '../../config';

export const getGenre = (genres): string =>
	genres
		.filter(genre => genre)
		.map(genre => (genre ? genre.name : ''))
		.join(', ');

export const getMainCast = (cast): string =>
	cast
		.filter(actor => actor)
		.map(actor => (actor ? actor.name : ''))
		.join(', ');

export default (movie: any): TMovie | any => {
	if (!movie) return;

	return {
		id: movie.id,
		poster_path: config.POSTER_PATH + movie.poster_path,
		runtime: movie.runtime,
		title: movie.title,
		release_date: movie.release_date,
		genres: getGenre(JSON.parse(movie.genres)),
		overview: movie.overview,
		budget: movie.budget,
		vote_average: movie.rate,
		video: `https://www.youtube.com/embed/${movie.video_link}`,
		hasVideo: !!movie.video_link,
		messages: movie.messages,
		imdb_id: movie.imdb_id,
		cast: JSON.parse(movie.cast || '[]'),
		mainCast: getMainCast(JSON.parse(movie.cast || '[]').slice(0, 3)),
		crew: movie.crew
	};
};
