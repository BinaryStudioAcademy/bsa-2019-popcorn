import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
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
	tooltip: string;
	onClick: () => void;
}

class ReactionItem extends Component<IReactItemProps> {
	getIcon = (name: string) => {
		switch (name) {
			case 'like':
				return <LikeIcon className='post-reaction-icon' />;
			case 'dislike':
				return <DislikeIcon className='post-reaction-icon' />;
			case 'popcorn':
				return <PopcornIcon className='post-reaction-icon' />;
			case 'haha':
				return <HahaIcon className='post-reaction-icon' />;
			case 'wow':
				return <WowIcon className='post-reaction-icon' />;
			case 'sad':
				return <SadIcon className='post-reaction-icon' />;
			case 'angry':
				return <AngryIcon className='post-reaction-icon' />;
		}
	};

	render() {
		const { name, tooltip, onClick } = this.props;
		const icon = this.getIcon(name);
		return (
			<div onClick={onClick} className="item-wrapper">
				<Tooltip
					title={tooltip}
					distance={30}
				>
					{icon}
				</Tooltip>
			</div>
		);
	}
}

export default ReactionItem;

