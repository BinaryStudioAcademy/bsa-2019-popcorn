import StoryListItem from '../story-list-item/story-list-item';
import React, { Component } from 'react';
interface IStoryListItem {
    name: string,
    imageUrl: string,
    avatar: string,
};

interface IStoryListItemsProps {
    storyListItems: Array<IStoryListItem>
}

class StoryListContent extends Component<IStoryListItemsProps>{
    render() {
        const { storyListItems } = this.props;
        const storyList = storyListItems.map(item => <StoryListItem imageUrl={item.imageUrl} name={item.name} avatar={item.avatar} />);
        return (storyList);
    }
}

export default StoryListContent;