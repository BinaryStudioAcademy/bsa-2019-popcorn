import React from 'react';
import './PostContent.scss';

const PostContent = ({ content: { image, description } }) => {
	return (
		<div className="post-item-content">
			<div className="feed-preview-content">
				<img src={image} alt="post-attachment" />
				<div className="feed-preview-text">
					<div>{description}</div>
					<a
						className="content-see-more"
						href="add-website-here"
						target="_blank"
						rel="nofollow"
					>
						<span>Press to see more</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default PostContent;
