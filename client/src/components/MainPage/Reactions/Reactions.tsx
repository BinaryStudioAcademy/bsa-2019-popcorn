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
		{ id: 1, name: 'like' },
		{ id: 2, name: 'dislike' },
		{ id: 3, name: 'popcorn' },
		{ id: 4, name: 'haha' },
		{ id: 5, name: 'wow' },
		{ id: 6, name: 'sad' },
		{ id: 7, name: 'angry' }
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
							key={index}
							onClick={() => onReactionClick(item)}
							name={item.name}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Reactions;
