import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTop } from './TopPage.redux/actions';
import Spinner from '../shared/Spinner';
import { convertServerDataFormatToClient } from './TopPage.service';
import TopPageTop from './TopPageTop/TopPageTop';
import TopPageMovie from './TopPageMovie/TopPageMovie';

import './TopPage.scss';

interface ITopProps {
	match: {
		path: string;
		params: any;
    };
    top: any;
    fetchTop: (topId: string) => any[];
}

const TopPage: React.SFC<ITopProps> = ({
    match,
    top,
    fetchTop
}) => {
    if (!top) {
        fetchTop(match.params.id);
        return <Spinner />
    }
    top = convertServerDataFormatToClient(top);

    return (
        <div className="top-page">
            <TopPageTop
                top={top}
            />
            <div className="top-movie-list">
                {
                    top.movieList.map((movie, index) =>
                        <TopPageMovie
                            key={index}
                            movie={movie}
                        />
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = (rootState, props) => ({
	...props,
    top: rootState.top.top
});

const actions = {
	fetchTop
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TopPage);