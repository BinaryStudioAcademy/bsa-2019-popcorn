import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MoviePreview from '../MoviePreview';
import { NavLink, Redirect } from 'react-router-dom';
import Extra from './extra';
import Image from '../../Image/Image';
import config from '../../../../config';

const default_amount = 5;

interface IProps {
	data: null | Array<{ data: any; type: string }>;
	loading: boolean;
	error: string;
	redirect?: boolean;
}

interface IState {
	amount: any;
	redirect: boolean;
}

class ResultList extends React.Component<IProps, IState> {
	state = {
		redirect: false,
		amount: {
			movie: default_amount,
			top: default_amount,
			survey: default_amount,
			event: default_amount,
			user: default_amount
		}
	};

	getView(dataElem, type, render) {
		const data = dataElem.slice(0, this.state.amount[type]);

		const obj = {};
		obj[type] = this.state.amount[type] + default_amount;
		const showMore =
			data.length !== dataElem.length ? (
				<div
					className={'show-more-button'}
					onClick={() => {
						if (this.props.redirect) this.setState({ redirect: true });
						this.setState({ amount: { ...obj } });
					}}
				>
					Show more
				</div>
			) : null;

		return (
			<div>
				{render(data)}
				{showMore}
			</div>
		);
	}

	renderList(elem: { data: any; type: string }) {
		if (!elem.data && !elem.data.length) return;

		switch (elem.type) {
			case 'movie':
				return this.getView(elem.data, 'movie', data =>
					data.map(movie => <MoviePreview movie={movie} key={movie.id} />)
				);
			case 'event':
				return this.getView(elem.data, 'event', data =>
					data.map(event => (
						<NavLink to={'/events/' + event.id} className={'text-decoration'}>
							<Extra
								clearExtra={data => null}
								data={event}
								link={'/events/' + event.id}
								type={'event'}
								readyPost={true}
							/>
						</NavLink>
					))
				);
			case 'top':
				return this.getView(elem.data, 'top', data =>
					data.map(top => (
						<NavLink to={'/tops/' + top.id} className={'text-decoration'}>
							<Extra
								clearExtra={data => null}
								data={top}
								link={'/tops/' + top.id}
								type={'top'}
								readyPost={true}
							/>
						</NavLink>
					))
				);
			case 'survey':
				return this.getView(elem.data, 'survey', data =>
					data.map(survey => (
						<NavLink to={`/user-page/${survey.user.id}/survey/${survey.id}`}>
							<Extra
								clearExtra={data => null}
								data={survey}
								link={`/user-page/${survey.user.id}/survey/${survey.id}`}
								type={'survey'}
								readyPost={true}
							/>
						</NavLink>
					))
				);
			case 'user':
				return this.getView(elem.data, 'user', data =>
					data.map(user => (
						<NavLink to={`/user-page/${user.id}`} className={'text-decoration'}>
							<div className={'user-info'}>
								<Image
									src={user.avatar}
									defaultSrc={config.DEFAULT_AVATAR}
									alt={''}
									className={'avatar'}
								/>
								<span className={'user-name'}>{user.name}</span>
							</div>
						</NavLink>
					))
				);
		}
	}

	render() {
		const { loading, error, data } = this.props;

		if (this.state.redirect) {
			this.setState({ redirect: false });
			return <Redirect to={'/content-search'} />;
		}
		return (
			<div className={'result-list'}>
				{loading && (
					<div className={'loading list-content'}>
						<span>Loading...</span>
					</div>
				)}
				{error && (
					<div className={'loading list-content'}>
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
