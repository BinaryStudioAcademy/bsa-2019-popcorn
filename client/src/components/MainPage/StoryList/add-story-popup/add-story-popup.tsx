import React, { Component } from "react";
import './add-story-popup.scss';
interface IAddStoryPopupProps {
    isShown: Boolean,
    onClosePopupClick: () => void
};

class AddStoryPopup extends Component<IAddStoryPopupProps> {

    getAddStoryPopupContent = () => {
        return (
            <div className="modal modal-story">
                <p>mock data</p>
                <button onClick={this.props.onClosePopupClick}>Cancel</button>
            </div>
        );
    }

    render() {
        const isShown = this.props.isShown;
        return isShown ? this.getAddStoryPopupContent() : null;
    }
}

export default AddStoryPopup;