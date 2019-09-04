import React from 'react';

interface IProps {
	story: any;
	reactionType?: string;
	type: 'incoming' | 'outgoing';
}

const MessageStory: React.FC<IProps> = ({ story, reactionType }) => {
	const getEmoji = () => {
		switch (reactionType) {
			case 'laugh':
				return '🤣';
			case 'fire':
				return '🔥';
			case 'claps':
				return '👏🏻';
			case 'stars':
				return '🤩';
			case 'cry':
				return '😢';
			case 'shock':
				return '😳';
			case 'angry':
				return '😡';
			case 'holiday':
				return '🥳';
			default:
				break;
		}
	};

	return (
		<div className="story-wrp">
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
