import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import './FilmBasicTabComponent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	movie: {
		id: string;
		poster_path: string;
		runtime: number;
		title: string;
		release_date?: string;
		genres: Array<string>;
		cast: Array<string>;
		overview: string;
		vote_average: number;
		budget: number;
		any?;	
	};
}

const starStyle = {
	width: '1em',
	height: '1em'
};
const solidStar = (key: number, type: boolean): any => (
	<FontAwesomeIcon
		icon={faStar}
		className={type ? 'yellowStar' : 'greyStar'}
		style={starStyle}
		key={key}
	/>
);

const rateBlock = (rate: number): ReactElement[] => {
	const res: any = [];

	for (let i = 0; i < 5; i++) {
		i < rate/2 ? res.push(solidStar(i, true)) : res.push(solidStar(i, false));
	}
	return res;
};

const descriptionItem = (
	title: string,
	body: string | ReactElement[] | number | undefined
) => (
	<div className="descriptionItem">
		<span className="descriptionTitle">{title}:</span>
		<span className="descriptionBody">{body}</span>
	</div>
);

const FilmBasicTab = (props: IProps) => {
	const {
		title,
		release_date: releaseYear,
		genres,
		runtime: duration,
		overview: description,
		vote_average: rate,
		budget,
		poster_path: imageLink 
	} = props.movie;

	const getFilmDuration = (runtime: number) => {
		if (!runtime || runtime <= 0) {
			return null;
		}
		const minutes = runtime % 60;
		const hours = Math.floor(runtime / 60);
		const mm = minutes < 10 ? `0${minutes}` : minutes;
		const hh = hours < 10 ? `0${hours}` : hours;
		return `${hh}:${mm}`;
	};

	const movieData = [
		{
			label: 'Original title',
			value: title
		},
		{
			label: 'Release year',
			value: releaseYear && releaseYear.slice(0, 4) || ''
		},
		{
			label: genres.length > 1 ? 'Genres' : 'Genre',
			value: 'Action, Drama, Horror'
		},
		{
			label: 'Duration',
			value: duration && getFilmDuration(duration) || ''
		},
		{
			label: 'Description',
			value: description
		},
		{
			label: 'Rating',
			value: rateBlock(rate)
		},
		{
			label: 'Budget',
			value: `${budget}$`
		}
	];

	return (
		<div className={'film-basic-wrp'}>
			<section className="filmSection">
				<img src={`https://image.tmdb.org/t/p/w500/${imageLink}`} alt={title} className="poster" />
				<div className="descriptionWrapper">
					{movieData.map(({ label, value }) => descriptionItem(label, value))}
				</div>
			</section>
			<section>
				<div className="videoWrapper">
					<iframe
						className="video"
						src='https://www.youtube.com/embed/KnrRy6kSFF0'
						frameBorder="0"
						title='https://www.youtube.com/embed/KnrRy6kSFF0'
					></iframe>
				</div>
			</section>
		</div>
	);
};

FilmBasicTab.propTypes = {
	movie: PropTypes.object
};

export default FilmBasicTab;
