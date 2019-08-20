import React from 'react';
import './MovieList.scss';
import MovieListItem from './MovieListItem/MovieListItem';
import TMovie from '../MovieSeriesPage/TMovie';

interface IMovieListProps {
	movies: Array<TMovie>;
	setMovieSeries?: (movie: any) => any;
	saveMovie?: (movie: TMovie) => any;
	twoColumns?: boolean;
}

const MovieList: React.FC<IMovieListProps> = ({
	movies,
	setMovieSeries,
	saveMovie,
	twoColumns = false
}) => {
	if (!movies) return <div>Any movie in list</div>;
	const movieListItems = movies.map(movie => {
		return (
			<MovieListItem
				key={movie.id}
				movie={movie}
				setMovieSeries={setMovieSeries}
				saveMovie={saveMovie}
			/>
		);
	});

	const style = twoColumns
		? { display: 'grid', gridTemplateColumns: '.5fr .5fr' }
		: {};
	return (
		<div className="movie-list" style={style}>
			{movieListItems}
		</div>
	);
};

export default MovieList;
