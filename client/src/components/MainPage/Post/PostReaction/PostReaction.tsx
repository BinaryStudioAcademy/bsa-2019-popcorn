import React, { Component } from 'react';
import './PostReaction.scss';
import { ReactComponent as LikeIcon } from '../../../../assets/icons/reactions/like.svg';
import { ReactComponent as DislikeIcon } from '../../../../assets/icons/reactions/dislike.svg';
import { ReactComponent as PopcornIcon } from '../../../../assets/icons/reactions/popcorn.svg';
import { ReactComponent as AngryIcon } from '../../../../assets/icons/reactions/angry.svg';
import { ReactComponent as HahaIcon } from '../../../../assets/icons/reactions/haha.svg';
import { ReactComponent as WowIcon } from '../../../../assets/icons/reactions/wow.svg';
import { ReactComponent as SadIcon } from '../../../../assets/icons/reactions/sad.svg';
import IReaction from '../IReaction';

interface IReactItemProps {
	name: string;
	quantity: number;
	onReactionClick: (reaction: { name: string }) => any;
}

export function getIcon(name: string) {
	switch (name) {
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
	}
}

class PostReaction extends Component<IReactItemProps> {
	render() {
		const { name, quantity, onReactionClick } = this.props;
		const icon = getIcon(name);
		return (
			<div
				className="post-reaction-wrapper"
				onClick={() => onReactionClick({ name })}
			>
				{icon}
				<div>{quantity}</div>
			</div>
		);
	}
}

export default PostReaction;
