import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import entitiesConfig from './entitiesConfig.json';
import './AdminPanelPage.scss';

import {
    fetchUsers,
    fetchMovies,
    fetchPosts,
    fetchTops,
    fetchStories,
    fetchEvents,
    fetchVoting
} from './AdminPanelPage.redux/actions';

interface IProps {
    users: any;
    fetchUsers: () => any;
    movies: any;
    fetchMovies: () => any;
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

const AdminPanelPage: React.FC<IProps> = (props) => {
    const [activeEntity, setActiveEntity] = useState();

    if (activeEntity && !props[activeEntity]) {
        const fetchEntity = `fetch${activeEntity[0].toUpperCase() + activeEntity.slice(1)}`;
        console.log(fetchEntity);
        
        props[fetchEntity]();
    }

    console.log(activeEntity);
    console.log(props[activeEntity]);

    return (
        <div className="admin-panel-page">
            <div className="entity-list">
                {
                    entitiesConfig.map((entity, index) => (
                        <label className="entity-item" key={index}>
                            <input
                                type="radio"
                                name="entity"
                                value={entity.name}
                                onChange={(e) => setActiveEntity(e.target.value)}
                            />
                            <span>{entity.label}</span>
                        </label>
                    ))
                }
            </div>
            {
                activeEntity && props[activeEntity] ? (
                    <table className="entity-data">
                        <thead>
                            {
                                Object.keys(props[activeEntity][0])
                                    .map(key => <th>{key}</th>)
                            }
                        </thead>
                        <tbody>
                            {
                                props[activeEntity].map(item => <tr>
                                    {
                                        Object.keys(item).map(key =>
                                            <td className="entity-data-value">
                                                {
                                                    typeof item[key] === 'object' ?
                                                        'ref' :
                                                        item[key]
                                                }
                                            </td>
                                        )
                                    }
                                    <td>
                                        <button
                                            className="entity-data-btn"
                                        >
                                            delete
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                ) : null
            }

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
    fetchMovies,
    fetchPosts,
    fetchTops,
    fetchStories,
    fetchEvents,
    fetchVoting
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPanelPage);
