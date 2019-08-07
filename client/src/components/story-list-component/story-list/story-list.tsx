import React, { Component } from 'react';
import StoryListContent from '../story-list-content/story-list-content';
import AddStoryItem from '../add-story-item/add-story-item';
import StoryListSlider from "../story-list-slider/story-list-slider";
import AddStoryPopup from "../add-story-popup/add-story-popup";

import './story-list.scss';


interface IStoryListItem {
    name: string,
    imageUrl: string,
    avatar: string,
};

class StoryList extends Component {
    mockedimageUrl = 'https://s3-alpha-sig.figma.com/img/e0c3/dd6e/d2d5bd4e0e1d9243f70ca5d2ba5f9130?Expires=1566172800&Signature=PZn4tI7Bfttzi9p9SM7hNsacTq8ul-9qr0c1X4n7MAFCDK8DIpdqN~YpdtLJO3ozvXCF1pWAxaOHdGkvIyuDdL5dYIVtgEOMf7S1oD5woUmPcF0C2PQ0p1mkMY5-QPEbrMy4e5~uuPvZo8XPaZaRypwBqNU7JPhZb8~6ZUt-xZJ8zum-lYmR4RWhPLfb02g3bPNCYRYw8c-Wuqr6WNfOQEeueUXyNl0HQCg9BK2hY3Lyz5s7FizfNzRVL9QZSsPdDbP-tbEZK~PUNlEPRn7Aw0JcEYMuJ1NuMoNOFHTYVvpFcKe0akNq9NDqDcWv2UaCB6NnsbxDIBejoN5EeuHozA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
    mockedText = "example";
    mockedAvatar = "https://pbs.twimg.com/profile_images/1148972773290762240/kmkJzp5I_400x400.png";
    array = [
        { imageUrl: this.mockedimageUrl, name: this.mockedText, avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: this.mockedText, avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: this.mockedText, avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: this.mockedText, avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: this.mockedText, avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: this.mockedText, avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: this.mockedText, avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: this.mockedText, avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "1", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "2", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "3", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "4", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "5", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "6", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "7", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "8", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "9", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "123", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "5", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "6", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "7", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "8", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "9", avatar: this.mockedAvatar },
        { imageUrl: this.mockedimageUrl, name: "123", avatar: this.mockedAvatar },
    ];

    scrollStep = 9;

    state = {
        index: 0,
        isPopupShown: false,
    }

    onOpenPopupClick = () => {
        this.setState({ isPopupShown: true });
    }

    onClosePopupClick = () => {
        this.setState({ isPopupShown: false });
    }

    scrollLeft = () => {
        const currentIndex = this.state.index;
        if (currentIndex - this.scrollStep < 0) {
            return;
        }

        this.setState({
            index: currentIndex - this.scrollStep
        })
    }

    scrollRight = () => {
        const currentIndex = this.state.index;
        if (currentIndex + this.scrollStep >= this.array.length) {
            return;
        }

        this.setState({
            index: currentIndex + this.scrollStep
        })
    }

    getStoryRange = (storyListItems: Array<IStoryListItem>, index: number) => {
        return storyListItems.slice(index, index + 9);
    }

    render() {
        return (<div className="story-list-wrapper">
            <AddStoryPopup onClosePopupClick={this.onClosePopupClick} isShown={this.state.isPopupShown} />
            <StoryListSlider scrollLeft={this.scrollLeft} scrollRight={this.scrollRight} />
            <div className="story-list">
                <AddStoryItem onOpenPopupClick={this.onOpenPopupClick} avatar={this.mockedAvatar} />
                <StoryListContent storyListItems={this.getStoryRange(this.array, this.state.index)} />
            </div>
        </div>);
    }
};

export default StoryList;
