import movieAdapter from '../MovieSeriesPage/movieAdapter';

export interface ITop {
	id: string;
	title: string;
	topImageUrl: string;
	created_at: Date;
	movieList: IMovie[];
	user: {
		id: string;
		name: string;
		avatar: string;
	};
}

export interface IMovie {
	id: number;
	title: string;
	release_date: any;
	poster_path: string;
	genres: any;
	comment: string;
}

export function convertServerDataFormatToClient(top: any): ITop | null {
	if (!top) {
		return null;
	}

	top.movieInTop.map(movieInTop => {
		if (movieInTop.movie) return;
		movieInTop.movie = movieAdapter(movieInTop.movie);
		return movieInTop;
	});

	return {
		id: top.id,
		title: top.title,
		topImageUrl: top.topImageUrl,
		created_at: top.created_at,
		movieList: top.movieInTop.map(movieInTop => {
			if (!movieInTop.movie) return;
			return {
				id: movieInTop.movie.id,
				title: movieInTop.movie.title,
				release_date: movieInTop.movie.release_date,
				poster_path: movieInTop.movie.poster_path,
				genres: movieInTop.movie.genres,
				comment: movieInTop.comment
			};
		}),
		user: {
			id: top.user.id,
			name: top.user.name,
			avatar: top.user.avatar
		}
	};
}
