import React from 'react';
import AdvancedSearchSliderBlock from '../AdvancedSearchSliderBlock/AdvancedSearchSliderBlock';
import AdvancedSearchCheckboxBlock from '../AdvancedSearchCheckboxBlock/AdvancedSearchCheckboxBlock';
import AdvancedSearchInputBlock from '../AdvancedSearchInputBlock/AdvancedSearchInputBlock';
import AdvancedSearchDatePicker from '../AdvancedSearchDatePicker/AdvancedSearchDatePicker';
import './AdvancedMovieSearch.scss';

interface IAdvancedMovieSearchProps {
	fetchFiltredMovies: (filters: any) => any;
	setFilters: (filters: any) => any;
	genres: any;
	casts: any;
}

type AdvancedMovieSearchState = {
	nameValue: string;
	genresValues: Array<string>;
	ratingValues: Array<number>;
	yearValues: { startDate: string; endDate: string };
	crewValues: Array<string>;
	castValues: string;
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
			castValues: '',
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
		this.triggerChange = this.triggerChange.bind(this);
	}
	timer;

	componentWillMount() {
		this.timer = null;
	}

	handleGenreChange = genre => {
		let newGenres = this.state.genresValues;
		if (newGenres.includes(genre) === false) {
			newGenres.push(genre);
		} else {
			newGenres = newGenres.filter(el => el !== genre);
		}
		this.setState(
			{
				...this.state,
				genresValues: newGenres
			},
			() => {
				this.props.setFilters(this.state);
				this.props.fetchFiltredMovies(this.state);
			}
		);
	};

	handleRatingChange = val => {
		clearTimeout(this.timer);
		this.setState(
			{
				...this.state,
				ratingValues: [val[0], val[1]]
			},
			() => {
				this.props.setFilters(this.state);
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
				this.props.setFilters(this.state);
				this.timer = setTimeout(this.triggerChange, 1000);
			}
		);
	};

	handleDescriptionChange = val => {
		clearTimeout(this.timer);
		this.setState(
			{
				...this.state,
				descriptionValue: val
			},
			() => {
				this.props.setFilters(this.state);
				this.timer = setTimeout(this.triggerChange, 1000);
			}
		);
	};

	handleNameChange = val => {
		clearTimeout(this.timer);
		this.setState(
			{
				...this.state,
				nameValue: val
			},
			() => {
				this.props.setFilters(this.state);
				this.timer = setTimeout(this.triggerChange, 1000);
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

	handleCastChange = val => {
		clearTimeout(this.timer);
		this.setState(
			{
				...this.state,
				castValues: val
			},
			() => {
				this.props.setFilters(this.state);
				this.timer = setTimeout(this.triggerChange, 1000);
			}
		);
	};

	handleDurationChange = val => {
		clearTimeout(this.timer);
		this.setState(
			{
				...this.state,
				durationValues: val
			},
			() => {
				this.props.setFilters(this.state);
				this.timer = setTimeout(this.triggerChange, 1000);
			}
		);
	};

	triggerChange = () => {
		this.props.fetchFiltredMovies(this.state);
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
					values={this.props.genres}
					header="Genres"
				/>
				<AdvancedSearchDatePicker
					onDateChange={this.handleYearChange}
					header="Release year"
				/>
				<AdvancedSearchInputBlock
					handleSearchChange={this.handleCastChange}
					header="Cast"
				/>
				<AdvancedSearchSliderBlock
					rangeHandler={this.handleRatingChange}
					min={0}
					max={10}
					step={0.1}
					marks={{ 0: '0', 10: '10' }}
					header="Rating"
					tooltip=""
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
					marks={{ 0: '0', 600: '600' }}
					header="Duration"
					tooltip="min"
				/>
			</div>
		);
	}
}

export default AdvancedMovieSearch;
