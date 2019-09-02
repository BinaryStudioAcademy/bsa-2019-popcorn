import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MoviePreview from '../MoviePreview';
import { NavLink } from 'react-router-dom';
import Extra from './extra';

interface IProps {
	data: null | Array<{ data: any; type: string }>;
	loading: boolean;
	error: string;
}

class ResultList extends React.Component<IProps> {
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
		const { loading, error, data } = this.props;

		return (
			<div className={'result-list'}>
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
				{data &&
					data.map(elem => {
						return elem && elem.data && elem.data.length > 0 ? (
							<div className={'list-wrp'}>
								<span className={'list-header'}>{elem.type}s</span>
								<div className={'list-content'}>{this.renderList(elem)}</div>
							</div>
						) : null;
					})}
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

const actions = {};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResultList);
