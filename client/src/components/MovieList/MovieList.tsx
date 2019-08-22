import React from 'react';
import './MovieList.scss';
import MovieListItem from './MovieListItem/MovieListItem';
import TMovie from '../MovieSeriesPage/TMovie';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../shared/Spinner';

interface IMovieListProps {
	movies: Array<TMovie>;
	setMovieSeries?: (movie: any) => any;
	saveMovie?: (movie: TMovie) => any;
	twoColumns?: boolean;
	loadMoreMovie?: (size: number, from: number) => any;
}

const filter = { from: 50, size: 50 };

const MovieList: React.FC<IMovieListProps> = ({
	movies,
	setMovieSeries,
	saveMovie,
	twoColumns = false,
	loadMoreMovie
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
	const next = () => {
		if (loadMoreMovie) {
			loadMoreMovie(filter.size, filter.from);
			filter.from = filter.from + filter.size;
		}
	};
	const style = twoColumns
		? { display: 'grid', gridTemplateColumns: '.5fr .5fr' }
		: {};
	return loadMoreMovie ? (
		<InfiniteScroll
			pageStart={1}
			loadMore={next}
			loader={
				<div className={'loading-wrp'}>
					<Spinner />
				</div>
			}
			hasMore={movies.length === filter.from}
		>
			<div className="movie-list" style={style}>
				{movieListItems}
			</div>
		</InfiniteScroll>
	) : (
		<div className="movie-list" style={style}>
			{movieListItems}
		</div>
	);
};

export default MovieList;
