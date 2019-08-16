import React from 'react';
import RecommendItem from '../RecommendItem/RecommendItem';
import './RecommendList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type RecommendList = {};

const RecommendList: React.FC = ({  }: RecommendList) => {
	return (
		<div className="recommend-list">
			<div className="recommend-heading">
				<FontAwesomeIcon icon={faStar} />
				<span>Recommended </span>
			</div>
			<RecommendItem
				recommendItem={{
					date: '22 July',
					name: 'Big Beauty reunion',
					image:
						'https://i1.wp.com/www.revistabula.com/wp/wp-content/uploads/2019/01/O-Lagosta-1.jpg?resize=610%2C350&ssl=1',
					rating: 4
				}}
			></RecommendItem>
			<RecommendItem
				recommendItem={{
					date: '26 June',
					name: 'The Great Gatsby',
					image:
						'https://www.thewrap.com/wp-content/uploads/files/2013/May/05/89511/main_image/gatsbybiginside.png',
					rating: 3
				}}
			></RecommendItem>
		</div>
	);
};

export default RecommendList;
