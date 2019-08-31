import React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from './redux/actions';
import MoviePreview from './MoviePreview/index';
import Extra from '../../UserPage/UserPosts/PostExtra/extra';
import { NavLink } from 'react-router-dom';

const options = ['all', 'movie', 'event', 'survey', 'top'];
const defaultOption = options[0];

interface IProps {
	fetchData: (title: string, type: string) => any;
	data: null | Array<{ data: any; type: string }>;
}

interface IState {
	title: string;
	type: string;
	showModal: boolean;
}

class ContentSearch extends React.Component<IProps, IState> {
	state = {
		title: '',
		type: defaultOption,
		showModal: false
	};

	componentDidMount(): void {
		document.addEventListener('click', () => {
			this.setModal(false);
		});
	}

	setModal(option: boolean) {
		this.setState({ showModal: option });
	}

	showModal(): boolean {
		return this.state.showModal;
	}

	renderList(elem: { data: any; type: string }) {
		switch (elem.type) {
			case 'movie':
				return elem.data.map(movie => (
					<MoviePreview movie={movie} key={movie.id} />
				));
			case 'event':
				return elem.data.map(event => (
					<NavLink to={'/events/' + event.id}>
						<Extra
							clearExtra={data => null}
							data={event}
							link={'/events/' + event.id}
							type={'event'}
							readyPost={true}
						/>
					</NavLink>
				));
			case 'top':
				return elem.data.map(top => (
					<NavLink to={'/tops/' + top.id}>
						<Extra
							clearExtra={data => null}
							data={top}
							link={'/tops/' + top.id}
							type={'top'}
							readyPost={true}
						/>
					</NavLink>
				));
			case 'survey':
				return elem.data.map(survey => (
					<NavLink to={`/user-page/${survey.user.id}/survey/${survey.id}`}>
						<Extra
							clearExtra={data => null}
							data={survey}
							link={`/user-page/${survey.user.id}/survey/${survey.id}`}
							type={'survey'}
							readyPost={true}
						/>
					</NavLink>
				));
		}
	}

	render() {
		const { title, type } = this.state;

		const { fetchData, data } = this.props;

		return (
			<div className={'content-search'}>
				<span className="search">
					<input
						type="text"
						placeholder="Search"
						value={title}
						className="search-input"
						onChange={e => this.setState({ title: e.target.value })}
						onKeyPress={e => {
							if (e.which === 13 && title.trim()) {
								fetchData(title, type);
								this.setModal(true);
							}
						}}
					/>
				</span>
				<select
					className="question-type"
					value={type}
					onChange={event => {
						this.setState({ type: event.target.value });
					}}
				>
					{options.map(option => (
						<option value={option}>{option}</option>
					))}
				</select>
				<div
					className={
						'modal-data-search ' +
						(this.showModal() ? 'modal-data-search-show' : '')
					}
				>
					{data && data.map(elem => this.renderList(elem))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	data: rootState.contentSearch.data
});

const actions = {
	fetchData
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentSearch);
