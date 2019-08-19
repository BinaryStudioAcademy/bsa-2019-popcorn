import React from 'react';
import './MovieList.scss';
import MovieListItem from './MovieListItem/MovieListItem';
import TMovie from '../MovieSeriesPage/TMovie';

interface IMovieListProps {
	movies: Array<TMovie>;
	setMovieSeries?: (movie: any) => any;
}

const MovieList: React.FC<IMovieListProps> = ({ movies, setMovieSeries }) => {
	if (!movies) return <div>Any movie in list</div>;
	const movieListItems = movies.map(movie => {
		return (
			<MovieListItem
				key={movie.id}
				movie={movie}
				setMovieSeries={setMovieSeries}
			/>
		);
	});

	return <div className="movie-list">{movieListItems}</div>;
};

export default MovieList;
