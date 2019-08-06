import React, { Component } from 'react';
import './add-story-item.scss';
class AddStoryItem extends Component<any> {
    render() {
        const { avatar } = this.props;
        return (<div className="add-story-wrapper">
            <div className="card-wrapper">
                <img src={avatar} className="avatar"></img>
                <button className="button">
                    <svg className="plus" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.1653 10.0581H10.6487V1.54152C10.6487 1.14923 10.3313 0.831787 9.93899 0.831787C9.5467 0.831787 9.22925 1.14923 9.22925 1.54152V10.0581H0.712667C0.320372 10.0581 0.00292969 10.3756 0.00292969 10.7678C0.00292969 11.1601 0.320372 11.4776 0.712667 11.4776H9.22925V19.9942C9.22925 20.3865 9.5467 20.7039 9.93899 20.7039C10.3313 20.7039 10.6487 20.3865 10.6487 19.9942V11.4776H19.1653C19.5576 11.4776 19.8751 11.1601 19.8751 10.7678C19.8751 10.3756 19.5576 10.0581 19.1653 10.0581Z" fill="black" fill-opacity="0.4" />
                    </svg>

                </button>
            </div>
            <div className="add-story-text">
                Tell your story
             </div>
        </div>);

    }
}

export default AddStoryItem;