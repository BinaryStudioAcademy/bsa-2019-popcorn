import React, { Component } from 'react';
import { render } from 'react-dom';
import './Reactions.scss';
import ReactionItem from './ReactionItem/ReactionItem';
interface IReactionsProps {
	MouseLeaveLikeButton: () => void;
	MouseEnterLikeButton: () => void;
	onReactionClick: (string) => void;
}
class Reactions extends Component<IReactionsProps> {
	reactions = [
		{ id: 1, name: 'like', tooltip: 'Like' },
		{ id: 2, name: 'dislike', tooltip: 'Dislike' },
		{ id: 3, name: 'popcorn', tooltip: 'Popcorn' },
		{ id: 4, name: 'haha', tooltip: 'Haha' },
		{ id: 5, name: 'wow', tooltip: 'Wow' },
		{ id: 6, name: 'sad', tooltip: 'Sad' },
		{ id: 7, name: 'angry', tooltip: 'Angry' }
	];
	render() {
		const {
			MouseLeaveLikeButton,
			MouseEnterLikeButton,
			onReactionClick
		} = this.props;
		return (
			<div className="reaction-box-wrapper">
				<div
					onMouseEnter={MouseEnterLikeButton}
					onMouseLeave={MouseLeaveLikeButton}
					className="reaction-box"
				>
					{this.reactions.map((item, index) => (
						<ReactionItem
							key={item.name}
							onClick={() => onReactionClick(item)}
							name={item.name}
							tooltip={item.tooltip}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Reactions;
