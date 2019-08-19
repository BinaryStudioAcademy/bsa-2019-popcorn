import React, { useState } from 'react';
import TMovie from '../../../MovieSeriesPage/TMovie';
import MovieList from '../../../MovieList/MovieList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const options = ["I've watched", "I'm going to watch", 'I recommend'];
interface IProps {
	fetchSearchToAddMovieInStory: (title: string) => any;
	searchTitle: string;
	moviesSearchAddMovieToStory: null | Array<TMovie>;
	saveMovie: (movie: TMovie, movieOption?: string) => any;
	history: {
		push: (path: string) => void;
	};
}
const CreateStoryFilm = ({ ...props }: IProps) => {
	const [option, setOption] = useState(options[0]);

	const close = () => props.history.push('/');
	const back = () => props.history.push('/create/extra');

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
					<textarea
						placeholder="Type a text here to find movie..."
						value={props.searchTitle}
						onChange={e => {
							if (e.target.value && e.target.value.trim())
								props.fetchSearchToAddMovieInStory(e.target.value.trim());
						}}
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
			</div>
			<div style={{ height: '380px', overflowY: 'scroll' }}>
				{props.moviesSearchAddMovieToStory ? (
					<MovieList
						movies={props.moviesSearchAddMovieToStory}
						saveMovie={(movie: TMovie) => {
							props.saveMovie(movie, option);
							props.history.push('/create');
						}}
					/>
				) : (
					<div>Not found</div>
				)}
			</div>
		</div>
	);
};

export default CreateStoryFilm;
