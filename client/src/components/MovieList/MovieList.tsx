import React from 'react';
import './MovieList.scss';
import MovieListItem from './MovieListItem/MovieListItem';
import TMovie from '../MovieSeriesPage/TMovie';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../shared/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleRight,
	faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons';

interface IMovieListProps {
	movies: TMovie[];
	setMovieSeries?: (movie: any) => any;
	saveMovie?: (movie: TMovie) => any;
	twoColumns?: boolean;
	loadMoreMovie?: (size: number, from: number, filters?: any) => any;
	filters?: any;
}

const filter = { from: 50, size: 50 };
const filter1 = { from: 0, size: 14 };

const MovieList: React.FC<IMovieListProps> = ({
	movies,
	setMovieSeries,
	saveMovie,
	twoColumns = false,
	loadMoreMovie,
	filters
}) => {
	if (!movies) {
		return <div>Any movie in list</div>;
	}
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

	const nextPage = () => {
		if (loadMoreMovie) {
			if (filters) {
				filter1.from = filter1.from + filter1.size;
				loadMoreMovie(filter1.size, filter1.from, filters);
			}
		}
	};

	const previousPage = () => {
		if (loadMoreMovie) {
			if (filter) {
				filter1.from = filter1.from - filter1.size;
				loadMoreMovie(filter1.size, filter1.from, filters);
			}
		}
	};

	const style = twoColumns
		? { display: 'grid', gridTemplateColumns: '.5fr .5fr' }
		: {};
	return loadMoreMovie && !filters ? (
		<InfiniteScroll
			style={{ width: '100%' }}
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
	) : filters ? (
		movies.length > 0 ? (
			<div style={{ width: '100%' }}>
				<div className="movie-list" style={style}>
					{movieListItems}
				</div>
				<div className="page-switch">
					<button onClick={previousPage} disabled={!(filter1.from > 0)}>
						<FontAwesomeIcon
							className="previous-icon"
							icon={faArrowCircleLeft}
						/>
						Previous page
					</button>
					<button
						onClick={nextPage}
						disabled={!(filter1.size === movies.length)}
					>
						Next page
						<FontAwesomeIcon className="next-icon" icon={faArrowCircleRight} />
					</button>
				</div>
			</div>
		) : (
			<div className="no-films-found">
				Sorry, no results found. Please adjust your search.
			</div>
		)
	) : (
		<div className="movie-list" style={style}>
			{movieListItems}
		</div>
	);
};

export default MovieList;
