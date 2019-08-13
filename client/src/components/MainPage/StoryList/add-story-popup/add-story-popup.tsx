import React, { Component } from 'react';
import './add-story-popup.scss';
import { Switch } from '@material-ui/core';
import { Route, Redirect } from 'react-router';
interface IAddStoryPopupProps {
	isShown: Boolean;
	onClosePopupClick: () => void;
}

class AddStoryPopup extends Component<IAddStoryPopupProps> {
	getAddStoryPopupContent = () => {
		return (
			<div className={'modal modal-story'}>
				<div className={'content-wrp'}></div>

				<div className={'btn-wrp'}>
					<button onClick={this.props.onClosePopupClick} className={'btn'}>
						Cancel
					</button>
					<button className={'btn'}>Save</button>
				</div>
			</div>
		);
	};

	render() {
		const isShown = this.props.isShown;
		return isShown ? (
			<div>
				{/*<Switch>*/}
				{/*	<Route path={'/create'} render={() => this.getAddStoryPopupContent()}/>*/}
				{/*</Switch>*/}
				<Redirect to={'/create'} />
			</div>
		) : null;
	}
}

export default AddStoryPopup;
