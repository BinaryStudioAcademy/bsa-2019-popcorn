import React from 'react';
import './MainPage.scss';
import FeedBlock from './FeedBlock/FeedBlock';
import StoryList from './StoryList';
//mock

const MainPage = (props: object) => {
	return (
		<div>
			<StoryList scrollStep={1} />
			<FeedBlock />
		</div>
	);
};

export default MainPage;
