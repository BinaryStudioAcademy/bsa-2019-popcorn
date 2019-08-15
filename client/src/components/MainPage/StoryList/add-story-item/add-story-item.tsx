import React, { Component } from 'react';
import './add-story-item.scss';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/storyList/plus-icon.svg';
interface AddStoryItemProps {
	avatar: string;
	onOpenPopupClick: () => void;
}
class AddStoryItem extends Component<AddStoryItemProps> {
	render() {
		const { avatar, onOpenPopupClick } = this.props;
		return (
			<div className="add-story-wrapper">
				<div className="card-wrapper" onClick={onOpenPopupClick}>
					<img
						alt="user-avatar"
						src={avatar}
						className="avatar avatar-story"
					></img>
					<button className="button-story">
						<PlusIcon className="plus" />
					</button>
				</div>
				<div className="add-story-text">Tell your story</div>
			</div>
		);
	}
}

export default AddStoryItem;
