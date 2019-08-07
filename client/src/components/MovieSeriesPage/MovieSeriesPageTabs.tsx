import React from 'react';
import { NavLink } from 'react-router-dom';
import movieSeriesTabsConfig from './movieSeriesTabsConfig.json';

interface IProps {
    mainPath: string
}

const MovieSeriesPageTabs: React.SFC<IProps> = ({ mainPath }) => {
    return (
        <nav className="movie-series-page-tabs">
            <ul className="movie-series-page-tab-list">
                {
                    movieSeriesTabsConfig.map((tab, index) =>
                        <li key={index}>
                            <NavLink
                                exact={!index}
                                to={mainPath + tab.link}
                                className="movie-series-page-tab"
                                activeClassName="movie-series-page-tab-active"
                            >
                                {tab.label}
                            </NavLink>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

export default MovieSeriesPageTabs;