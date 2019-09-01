import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
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
	getIcon = (name: string, tooltip: string) => {
		switch (name) {
			case 'like':
				return <LikeIcon data-tip={tooltip} />;
			case 'dislike':
				return <DislikeIcon data-tip={tooltip} />;
			case 'popcorn':
				return <PopcornIcon data-tip={tooltip} />;
			case 'haha':
				return <HahaIcon data-tip={tooltip} />;
			case 'wow':
				return <WowIcon data-tip={tooltip} />;
			case 'sad':
				return <SadIcon data-tip={tooltip} />;
			case 'angry':
				return <AngryIcon data-tip={tooltip} />;
		}
	};

	render() {
		const { name, tooltip, onClick } = this.props;
		const icon = this.getIcon(name, tooltip);
		return (
			<div onClick={onClick} className="item-wrapper">
				{icon}
				<ReactTooltip
					place="top"
					type="dark"
					effect="solid"
					className="tooltip"
				/>
			</div>
		);
	}
}

export default ReactionItem;
