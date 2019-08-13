import React, { Component } from 'react';
import './ReactionItem.scss';
import { ReactComponent as LikeIcon } from '../../../../assets/icons/reactions/like.svg';
import { ReactComponent as DislikeIcon } from '../../../../assets/icons/reactions/dislike.svg';
import { ReactComponent as PopcornIcon } from '../../../../assets/icons/reactions/popcorn.svg';
import { ReactComponent as AngryIcon } from '../../../../assets/icons/reactions/angry.svg';
import { ReactComponent as HahaIcon } from '../../../../assets/icons/reactions/haha.svg';
import { ReactComponent as WowIcon } from '../../../../assets/icons/reactions/wow.svg';
import { ReactComponent as SadIcon } from '../../../../assets/icons/reactions/sad.svg';
interface IReactItemProps {
	name: string;
	onClick: () => void;
}

class ReactionItem extends Component<IReactItemProps> {
	getIcon = (name: string) => {
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
	};

	render() {
		const { name, onClick } = this.props;
		const icon = this.getIcon(name);
		return (
			<div onClick={onClick} className="item-wrapper">
				{icon}
			</div>
		);
	}
}

export default ReactionItem;
