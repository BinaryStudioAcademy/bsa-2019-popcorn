import React, { useState } from 'react';
import Spinner from '../shared/Spinner';
import { convertServerDataFormatToClient } from './TopPage.service';
import TopPageTop from './TopPageTop/TopPageTop';
import TopPageMovie from './TopPageMovie/TopPageMovie';

import config from '../../config';
import webApi from '../../services/webApi.service';

import './TopPage.scss';

interface ITopProps {
	match: {
		path: string;
		params: any;
	};
}

const TopPage: React.SFC<ITopProps> = ({ match }) => {
	const [top, setTop] = useState();

	if (!top) {
		webApi({
			method: 'GET',
			endpoint: config.API_URL + `/api/top/${match.params.id}`
		}).then(top => {
			setTop(convertServerDataFormatToClient(top));
		});

		return <Spinner />;
	}
	console.log(top.movieList.length);
	return (
		<div className="top-page">
			<TopPageTop top={top} />
			<div className="top-movie-list">
				{top.movieList.map((movie, index) => (
					<TopPageMovie index={index + 1} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default TopPage;
