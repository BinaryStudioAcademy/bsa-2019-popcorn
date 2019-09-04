import React, { useState } from 'react';
import TMovie from '../../../MovieSeriesPage/TMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import MovieSearch from "../../../shared/MovieSearch/MovieSearch";
import MovieListItem from "../../../MovieList/MovieListItem/MovieListItem";
import { getGenre, getMainCast } from "../../../MovieSeriesPage/movieAdapter";
import config from "../../../../config";

const elasticProperties = [
	'id',
	'title',
	'runtime',
	'poster_path',
	'release_date',
	'cast',
	'genres'
];

const options = ["I've watched", "I'm going to watch", 'I recommend'];
interface IProps {
	saveMovie: (movie: TMovie, movieOption?: string) => any;
	history: {
		push: (path: string) => void;
	};
}
const CreateStoryFilm = ({ ...props }: IProps) => {
	const [option, setOption] = useState(options[0]);

	const close = () => props.history.push('/');
	const back = () => props.history.push('/create/extra');

	const [movie, setMovie] = useState();

	const convertMovie = (movie) => {
		return {
			...movie,
			poster_path: `${config.POSTER_PATH}/${movie.poster_path}`,
			genres: getGenre(JSON.parse(movie.genres)),
			mainCast: getMainCast(JSON.parse(movie.cast).slice(0, 3))
		};
	}

	return (
		<div className={'modal modal-story'}>
			<div className={'nav-block-wrp'}>
				<span onClick={back}>
					<FontAwesomeIcon
						icon={faArrowCircleLeft}
						className={'fontAwesomeIcon'}
					/>
				</span>
				<span onClick={close}>
					<FontAwesomeIcon icon={faTimesCircle} className={'fontAwesomeIcon'} />
				</span>
			</div>
			<div className={'movie-add-wrp'}>
				<div className={'edit-form'}>
					<MovieSearch
						onSelectMovie={movie => setMovie(convertMovie(movie))}
						elasticProperties={elasticProperties}
					/>
				</div>
				<select
					className="question-type"
					value={option}
					onChange={event => {
						setOption(event.target.value);
					}}
				>
					{options.map(option => (
						<option value={option}>{option}</option>
					))}
				</select>
				<div className="selected-movie">
					{
						movie && (
							<MovieListItem
								movie={movie}
								key='1'
								saveMovie={(movie: TMovie) => {
									props.saveMovie(movie, option);
									props.history.push('/create');
								}}
							/>
						)
					}
				</div>
			</div>
		</div>
	);
};

export default CreateStoryFilm;
