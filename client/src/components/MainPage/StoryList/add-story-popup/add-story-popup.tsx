import React from 'react';
import '../story-modal/add-story-popup.scss';
import { Redirect } from 'react-router';
interface IAddStoryPopupProps {
	isShown: Boolean;
	onClosePopupClick: () => void;
	handleUpdateModal: (value: boolean) => void;
}

const AddStoryPopup = (props: IAddStoryPopupProps) => {
	const isShown = props.isShown;
	if (isShown) {
		props.handleUpdateModal(false);
	}
	return isShown ? (
		<div>
			<Redirect to={'/create'} />
		</div>
	) : null;
};

export default AddStoryPopup;
