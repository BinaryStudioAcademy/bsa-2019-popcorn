import React from 'react';
import { ReactComponent as LikeIcon } from '../../../../assets/icons/reactions/like.svg';
import { ReactComponent as DislikeIcon } from '../../../../assets/icons/reactions/dislike.svg';
import { ReactComponent as PopcornIcon } from '../../../../assets/icons/reactions/popcorn.svg';
import { ReactComponent as AngryIcon } from '../../../../assets/icons/reactions/angry.svg';
import { ReactComponent as HahaIcon } from '../../../../assets/icons/reactions/haha.svg';
import { ReactComponent as WowIcon } from '../../../../assets/icons/reactions/wow.svg';
import { ReactComponent as SadIcon } from '../../../../assets/icons/reactions/sad.svg';
import { ReactComponent as FireIcon } from '../../../../assets/icons/reactions/fire.svg';

interface IProps {
	story: any;
	reactionType?: string;
	type: 'incoming' | 'outgoing';
}

const MessageStory: React.FC<IProps> = ({ story, reactionType }) => {
	const getEmoji = () => {
		switch (reactionType) {
			case 'like':
				return <LikeIcon />;
			case 'dislike':
				return <DislikeIcon />;
			case 'popcorn':
				return <PopcornIcon />;
			case 'haha':
				return <HahaIcon />;
			case 'wow':
				return <WowIcon />;
			case 'sad':
				return <SadIcon />;
			case 'angry':
				return <AngryIcon />;
			case 'fire':
				return <FireIcon />;
			default:
				break;
		}
	};

	return (
		<div className="story-wrp">
			{reactionType ? (
				<div className="reaction-comment">Reacted to your story</div>
			) : (
				<div className="reaction-comment">Commented on your story</div>
			)}
			{reactionType && <span className="reaction">{getEmoji()}</span>}
			<div
				className="story"
				style={{
					backgroundColor: story.backgroundColor,
					backgroundImage: `url(${story.image_url})`,
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center'
				}}
			></div>
		</div>
	);
};

export default MessageStory;
