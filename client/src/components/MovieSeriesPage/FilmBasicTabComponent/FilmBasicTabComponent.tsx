import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import './FilmBasicTabComponent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import TMovie from '../TMovie';
import getFilmDuration from '../../../helpers/getFilmDuration';

interface IProps {
	movie: TMovie;
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

const rateBlock = (rateString: string): ReactElement[] => {
	const rate = parseFloat(rateString);
	const res: any = [];

	for (let i = 0; i < 5; i++) {
		i < rate ? res.push(solidStar(i, true)) : res.push(solidStar(i, false));
	}
	return res;
};

const descriptionItem = (
	title: string,
	body: string | ReactElement[] | number | undefined
) => (
	<div className={'descriptionItem'}>
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
		vote_average,
		budget,
		poster_path,
		video,
		hasVideo
	} = props.movie;

	const movieData = [
		{
			label: 'Original title',
			value: title
		},
		{
			label: 'Release year',
			value: (releaseYear && releaseYear.slice(0, 4)) || ''
		},
		{
			label: genres.length > 1 ? 'Genres' : 'Genre',
			value: genres
		},
		{
			label: 'Duration',
			value: (duration && getFilmDuration(duration)) || ''
		},
		{
			label: 'Description',
			value: description
		},
		{
			label: 'Rating',
			value: rateBlock(vote_average)
		},
		{
			label: 'Budget',
			value: `${budget}$`
		}
	];

	return (
		<div className={'film-basic-wrp'}>
			<section className={'filmSection'}>
				<img src={poster_path} alt={title} className="poster" />
				<div className={'descriptionWrapper'}>
					{movieData.map(({ label, value }) => descriptionItem(label, value))}
				</div>
			</section>
			{hasVideo && (
				<section>
					<div className={'videoWrapper'}>
						<iframe
							className="video"
							src={video}
							title={video}
							frameBorder={0}
						/>
					</div>
				</section>
			)}
		</div>
	);
};

FilmBasicTab.propTypes = {
	movie: PropTypes.object
};

export default FilmBasicTab;
