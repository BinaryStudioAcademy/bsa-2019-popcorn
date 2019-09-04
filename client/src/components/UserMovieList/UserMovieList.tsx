import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMovieListDetails } from '../UserPage/UserLists/actions';
import Spinner from '../shared/Spinner';
import './UserMovieList.scss';
import Image from '../shared/Image/Image';
import config from '../../config';
import { NavLink } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import MovieItem from './MovieItem/MovieItem';

interface IProps {
	match: any;
	fetchMovieListDetails: (movieListId: string) => object;
	isLoading: boolean;
	movieListDetails: IMovieListDetails;
}

interface IMovieListDetails {
	movieList: {
		id: string;
		title: string;
		description: string;
		isPrivate: boolean;
		image_url: string;
		moviesId: Array<string>;
		created_at: Date;
		user: {
			id: string;
			name: string;
			avatar: string;
		};
	};
	movies: Array<IMovie>;
}

export interface IMovie {
	id: string;
	title: string;
	poster_path: string;
	release_date: string;
	runtime: number;
	overview: string;
	genres: Array<string>;
}

const UserMovieList: React.FC<IProps> = ({ ...props }) => {
	const {
		match: {
			params: { id: movieListId }
		},
		isLoading,
		movieListDetails,
		fetchMovieListDetails
	} = props;

	if (!movieListDetails || movieListDetails.movieList.id !== movieListId) {
		fetchMovieListDetails(movieListId);
		return <Spinner />;
	}

	const {
		id,
		title,
		description,
		isPrivate,
		image_url,
		created_at,
		user: { id: userId, name: userName, avatar: userAvatar }
	} = movieListDetails.movieList;

	const { movies } = movieListDetails;

	return (
		<div className="UserMovieList">
			<div className="movie-list-container">
				<header className="movie-list-header">
					<div className="movie-list-image-container">
						<Image
							src={image_url}
							defaultSrc={config.DEFAULT_MOVIELIST_IMAGE}
							alt="movie-list"
						/>
					</div>
					<div className="movie-list-main">
						<div className="movie-list-title">{title}</div>
						<div className="movie-list-description">{description}</div>
						<NavLink
							className="user-info-container"
							to={`/user-page/${userId}`}
						>
							<div className="user-image-container">
								<Image
									src={userAvatar}
									defaultSrc={config.DEFAULT_AVATAR}
									alt="avatar"
								/>
							</div>
							<div className="user-name">{userName}</div>
						</NavLink>
						<div className="movie-list-created">
							<ReactTimeAgo date={new Date(created_at)} />
						</div>
					</div>
				</header>
				<div className="movie-list-items">
					{movies.map(movie => (
						<MovieItem movie={movie} key={movie.id} />
					))}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	isLoading: rootState.movieList.isLoading,
	movieListDetails: rootState.movieList.movieListDetails
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchMovieListDetails
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserMovieList);
