import React from 'react';
import './style.scss';
const options = ['movie', 'event', 'survey', 'top'];
const defaultOption = options[0];

interface IState {
	value: string;
	option: string;
}

class ContentSearch extends React.Component<{}, IState> {
	state = {
		value: '',
		option: defaultOption
	};

	render() {
		const { value, option } = this.state;

		return (
			<div className={'content-search'}>
				<span className="search">
					<input
						type="text"
						placeholder="Search"
						value={value}
						className="search-input"
						onChange={e => this.setState({ value: e.target.value })}
					/>
				</span>
				<select
					className="question-type"
					value={option}
					onChange={event => {
						this.setState({ option: event.target.value });
					}}
				>
					{options.map(option => (
						<option value={option}>{option}</option>
					))}
				</select>
				{/*<span className="filter hover">*/}
				{/*<NavLink to={'/advanced-search'}>*/}
				{/*	Filter*/}
				{/*	<FontAwesomeIcon icon={faChevronDown} />*/}
				{/*</NavLink>*/}
				{/*{focusInput && value.trim() ? (*/}
				{/*    <div className="modal">*/}
				{/*        {movies && movies.length > 0 ? (*/}
				{/*            <MovieList movies={movies} setMovieSeries={setMovieSeries} />*/}
				{/*        ) : (*/}
				{/*            <span>Nothing was found</span>*/}
				{/*        )}*/}
				{/*    </div>*/}
				{/*) : null}*/}
			</div>
		);
	}
}

export default ContentSearch;
