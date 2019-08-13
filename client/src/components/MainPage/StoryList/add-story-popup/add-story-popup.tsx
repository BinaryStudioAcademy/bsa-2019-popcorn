import React, { Component } from 'react';
import './add-story-popup.scss';
import { Redirect } from 'react-router';
interface IAddStoryPopupProps {
	isShown: Boolean;
	onClosePopupClick: () => void;
}

const AddStoryPopup = (props: IAddStoryPopupProps) => {
	const isShown = props.isShown;
	return isShown ? (
		<div>
			<Redirect to={'/create'} />
		</div>
	) : null;
};

export default AddStoryPopup;
