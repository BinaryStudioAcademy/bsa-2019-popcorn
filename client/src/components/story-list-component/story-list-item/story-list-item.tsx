import React, { Component } from 'react';
import './story-list-item.scss';
interface IStoryListItemProps {
    name: string,
    imageUrl: string,
    avatar: string,
};

class StoryListItem extends Component<IStoryListItemProps>{
    render() {
        const { imageUrl, name, avatar } = this.props;
        return (
            <div className="story-list-item-wrapper">
                <div className="card">
                    <img className="avatar" src={avatar}></img>
                    <img className="story-pic" src={imageUrl}></img>
                </div>
                <div className="story-name">
                    {name}
                </div>
            </div>);
    }
};

export default StoryListItem;
