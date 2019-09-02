import React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from './redux/actions';
import MoviePreview from './MoviePreview/index';
import Extra from '../../UserPage/UserPosts/PostExtra/extra';
import { NavLink } from 'react-router-dom';

const options = ['all', 'movie', 'event', 'survey', 'top', 'user'];
const defaultOption = options[0];
const whiteList = ['content-search', 'question-type', 'search-input'];

interface IProps {
	fetchData: (title: string, type: string) => any;
	data: null | Array<{ data: any; type: string }>;
	loading: boolean;
	error: string;
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

	static isEmpty(data) {
		return !(data && data.some(elem => elem.data && elem.data.length > 0));
	}

	componentDidMount(): void {
		document.addEventListener('click', (e: any) => {
			if (!(e && e.target && e.target.classList)) return this.setModal(false);

			const classList = e.target.classList;

			if (whiteList.indexOf(classList[0]) === -1) {
				return this.setModal(false);
			}
		});
	}

	setModal(option: boolean) {
		this.setState({ showModal: option });
	}

	showModal(): boolean {
		return this.state.showModal || this.props.loading || !!this.props.error;
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

		const { fetchData, data, loading, error } = this.props;

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
						onFocus={() =>
							ContentSearch.isEmpty(data) ? null : this.setModal(true)
						}
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
					{loading && (
						<div className={'loading'}>
							<span>Loading...</span>
						</div>
					)}
					{error && (
						<div className={'loading'}>
							<span>{error}</span>
						</div>
					)}
					{data && data.map(elem => this.renderList(elem))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	data: rootState.contentSearch.data,
	loading: rootState.contentSearch.loading,
	error: rootState.contentSearch.error
});

const actions = {
	fetchData
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentSearch);
