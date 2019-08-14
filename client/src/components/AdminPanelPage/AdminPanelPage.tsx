import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import entitiesConfig from './entitiesConfig.json';
import './AdminPanelPage.scss';

import {
	fetchUsers,
	deleteUsers,
	fetchMovies,
	deleteMovies,
	fetchPosts,
	deletePosts,
	fetchTops,
	deleteTops,
	fetchStories,
	deleteStories,
	fetchEvents,
	deleteEvents,
	fetchVoting
} from './AdminPanelPage.redux/actions';

interface IProps {
	users: any;
	fetchUsers: () => any;
	movies: any;
	fetchMovies: () => any;
	deleteMovies: () => any;
	posts: any;
	fetchPosts: () => any;
	tops: any;
	fetchTops: () => any;
	stories: any;
	fetchStories: () => any;
	events: any;
	fetchEvents: () => any;
	voting: any;
	fetchVoting: () => any;
}

const AdminPanelPage: React.FC<IProps> = props => {
	const [activeEntity, setActiveEntity] = useState();

	const deleteEntityItem = e => {
		if (e.target.classList.contains('entity-data-btn')) {
			const id = e.currentTarget.dataset.itemId;
			const deleteEntity = `delete${activeEntity[0].toUpperCase() +
				activeEntity.slice(1)}`;

			props[deleteEntity](id);
		}
	};

	if (activeEntity && !props[activeEntity]) {
		const fetchEntity = `fetch${activeEntity[0].toUpperCase() +
			activeEntity.slice(1)}`;
		props[fetchEntity]();
	}

	console.group();
	console.log(activeEntity);
	console.log(props[activeEntity]);
	console.groupEnd();

	return (
		<div className="admin-panel-page">
			<div className="entity-list">
				{entitiesConfig.map((entity, index) => (
					<label className="entity-item" key={index}>
						<input
							type="radio"
							name="entity"
							value={entity.name}
							onChange={e => setActiveEntity(e.target.value)}
						/>
						<span>{entity.label}</span>
					</label>
				))}
			</div>
			{
				activeEntity && !props[activeEntity] ? (
					<span className="entity-data-warning">Loading...</span>
				) : null
			}
			{activeEntity && props[activeEntity] && props[activeEntity].length ? (
				<table className="entity-data">
					<thead>
						<tr>
							{Object.keys(props[activeEntity][0]).map((key, index) => (
								<th key={index}>{key}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{props[activeEntity].map((item, index) => (
							<tr key={index} data-item-id={item.id} onClick={deleteEntityItem}>
								{Object.keys(item).map((key, index) => (
									<td className="entity-data-value" key={index}>
										{typeof item[key] === 'object' ? 'ref' : item[key]}
									</td>
								))}
								<td>
									<button className="entity-data-btn">delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
					activeEntity && props[activeEntity] && !props[activeEntity].length ? (
						<span className="entity-data-warning">Empty data</span>
					) : null
			)}
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	users: rootState.adminPanel.users,
	movies: rootState.adminPanel.movies,
	posts: rootState.adminPanel.posts,
	tops: rootState.adminPanel.tops,
	stories: rootState.adminPanel.stories,
	events: rootState.adminPanel.events,
	voting: rootState.adminPanel.voting
});

const actions = {
	fetchUsers,
	deleteUsers,
	fetchMovies,
	deleteMovies,
	fetchPosts,
	deletePosts,
	fetchTops,
	deleteTops,
	fetchStories,
	deleteStories,
	fetchEvents,
	deleteEvents,
	fetchVoting
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminPanelPage);
