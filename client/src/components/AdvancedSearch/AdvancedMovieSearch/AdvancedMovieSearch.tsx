import React from 'react';
import AdvancedSearchSliderBlock from '../AdvancedSearchSliderBlock/AdvancedSearchSliderBlock';
import AdvancedSearchCheckboxBlock from '../AdvancedSearchCheckboxBlock/AdvancedSearchCheckboxBlock';
import AdvancedSearchInputBlock from '../AdvancedSearchInputBlock/AdvancedSearchInputBlock';
import AdvancedSearchDatePicker from '../AdvancedSearchDatePicker/AdvancedSearchDatePicker';
import './AdvancedMovieSearch.scss';

const mockedGenres = [
	'horror',
	'comedy',
	'action',
	'thriller',
	'crime',
	'drama',
	'documentary',
	'history',
	'music',
	'mystery'
];
const mockedCountries = ['UK', 'USA', 'Japan', 'France', 'Spain', 'Germany'];
const mockedCrew = ['Quentin Tarantino', 'Guillermo del Toro'];
const mockedCast = [
	'Brad Pitt',
	'Tom Cruz',
	'Keanu Revees',
	'Robert Downey Jr.'
];

interface IAdvancedMovieSearchProps {
	fetchFiltredMovies: (filters: any) => any;
}

type AdvancedMovieSearchState = {
	nameValue: string;
	genresValues: Array<string>;
	ratingValues: Array<number>;
	yearValues: { startDate: string; endDate: string };
	crewValues: Array<string>;
	castValues: Array<string>;
	durationValues: Array<number>;
	descriptionValue: string;
};

class AdvancedMovieSearch extends React.Component<
	IAdvancedMovieSearchProps,
	AdvancedMovieSearchState
> {
	constructor(props) {
		super(props);
		this.state = {
			nameValue: '',
			genresValues: [],
			ratingValues: [],
			yearValues: {
				startDate: '1900-01-01',
				endDate: this.convert(new Date())
			},
			descriptionValue: '',
			castValues: [],
			crewValues: [],
			durationValues: []
		};
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.handleRatingChange = this.handleRatingChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleCrewChange = this.handleCrewChange.bind(this);
		this.handleCastChange = this.handleCastChange.bind(this);
		this.handleDurationChange = this.handleDurationChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleGenreChange = genre => {
		let newGenres = this.state.genresValues;
		if (newGenres.includes(genre) === false) {
			newGenres.push(genre);
		} else {
			newGenres = newGenres.filter(el => el !== genre);
		}

		this.setState({
			...this.state,
			genresValues: newGenres
		});
	};

	handleRatingChange = val => {
		this.setState(
			{
				...this.state,
				ratingValues: [val[0] * 2, val[1] * 2]
			},
			() => {
				this.props.fetchFiltredMovies(this.state);
			}
		);
	};

	convert(newDate) {
		let year = newDate.getFullYear();
		let mnth = ('0' + (newDate.getMonth() + 1)).slice(-2);
		let day = ('0' + newDate.getDate()).slice(-2);
		return [year, mnth, day].join('-');
	}

	handleYearChange = val => {
		let convertedVal = {
			startDate: val.startDate
				? this.convert(val.startDate)
				: this.state.yearValues.startDate,
			endDate: val.endDate
				? this.convert(val.endDate)
				: this.state.yearValues.endDate
		};
		this.setState(
			{
				...this.state,
				yearValues: convertedVal
			},
			() => {
				this.props.fetchFiltredMovies(this.state);
			}
		);
	};

	handleDescriptionChange = val => {
		this.setState(
			{
				...this.state,
				descriptionValue: val
			},
			() => {
				this.props.fetchFiltredMovies(this.state);
			}
		);
	};

	handleNameChange = val => {
		this.setState(
			{
				...this.state,
				nameValue: val
			},
			() => {
				this.props.fetchFiltredMovies(this.state);
			}
		);
	};

	handleCrewChange = crew => {
		let newCrew = this.state.crewValues;
		if (newCrew.includes(crew) === false) {
			newCrew.push(crew);
		} else {
			newCrew = newCrew.filter(el => el !== crew);
		}

		this.setState({
			...this.state,
			crewValues: newCrew
		});
	};

	handleCastChange = cast => {
		let newCast = this.state.castValues;
		if (newCast.includes(cast) === false) {
			newCast.push(cast);
		} else {
			newCast = newCast.filter(el => el !== cast);
		}

		this.setState({
			...this.state,
			castValues: newCast
		});
	};

	handleDurationChange = val => {
		this.setState(
			{
				...this.state,
				durationValues: val
			},
			() => {
				this.props.fetchFiltredMovies(this.state);
			}
		);
	};
	render() {
		return (
			<div className="advanced-movie-search">
				<AdvancedSearchInputBlock
					handleSearchChange={this.handleNameChange}
					header="Name"
				/>
				<AdvancedSearchCheckboxBlock
					checkboxHandler={this.handleGenreChange}
					values={mockedGenres}
					header="Genres"
				/>
				{/*<AdvancedSearchSliderBlock
					rangeHandler={this.handleYearChange}
					min={0}
					max={5}
					step={0.1}
					header="Year"
				/>*/}
				<AdvancedSearchDatePicker
					onDateChange={this.handleYearChange}
					header="Release date"
				/>
				<AdvancedSearchCheckboxBlock
					checkboxHandler={this.handleCrewChange}
					values={mockedCrew}
					header="Crew"
				/>
				<AdvancedSearchCheckboxBlock
					checkboxHandler={this.handleCastChange}
					values={mockedCast}
					header="Cast"
				/>
				<AdvancedSearchSliderBlock
					rangeHandler={this.handleRatingChange}
					min={0}
					max={5}
					step={0.1}
					header="Rating"
				/>
				<AdvancedSearchInputBlock
					handleSearchChange={this.handleDescriptionChange}
					header="Description"
				/>
				<AdvancedSearchSliderBlock
					rangeHandler={this.handleDurationChange}
					min={0}
					max={600}
					step={1}
					header="Duration"
				/>
			</div>
		);
	}
}

export default AdvancedMovieSearch;
