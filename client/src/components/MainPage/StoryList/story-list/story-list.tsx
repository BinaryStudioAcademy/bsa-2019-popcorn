import React, {Component, ReactInstance} from 'react';
import StoryListContent from '../story-list-content/story-list-content';
import AddStoryItem from '../add-story-item/add-story-item';
import AddStoryPopup from "../add-story-popup/add-story-popup";
import './story-list.scss';
import Spinner from "../../../shared/Spinner";
import config from "../../../../config";

interface IStoryListItem {
    caption: string,
    image_url: string,
    user: {
        avatar: string,
        any
    },
    any
};

interface IStoryListProps {
    scrollStep: number,
    stories: null | Array<IStoryListItem>,
    fetchStories: () => any,
    avatar: null | string
}

interface IState {
    isPopupShown: boolean,
    scrollStep: number,
    isDown: boolean,
    startX: number,
    scrollLeft: number,
}

interface ILoad {
    from: number,
    count: number
}

class StoryList extends Component<IStoryListProps, IState> {

    storiesFilter: ILoad;
    
    constructor(props){
        super(props);

        this.state = {
            isPopupShown: false,
            scrollStep: props.scrollStep || 1,
            isDown: false,
            startX: 0,
            scrollLeft: 0,
        }

        this.storiesFilter = { 
            from: 0,
            count: 10,
        };
    }

    componentDidMount() {
        this.props.fetchStories();
    }


    onOpenPopupClick = () => {
        this.setState({isPopupShown: true});
    }

    onClosePopupClick = () => {
        this.setState({isPopupShown: false});
    }

    onMouseDown = (event) => {
        const scroll: any = this.refs.scroll; 
        const startX = event.pageX - scroll.offsetLeft;
        const scrollLeft = scroll.scrollLeft;
        this.setState({ startX, scrollLeft, isDown: true });
    }

    onMouseLeave = () => {
        this.setState({ isDown: false });
    }

    onMouseMove = (event) => {
        const { startX, scrollLeft, isDown } = this.state;
        const scroll: any = this.refs.scroll; 
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - scroll.offsetLeft;
        const walk = (x - startX); 
        scroll.scrollLeft = scrollLeft - walk;
    }

    loadFunction = () => {
        if(!this.props.stories || this.props.stories.length === 0)
            return;
        const currentIndex = this.storiesFilter.from;

        if (currentIndex + this.state.scrollStep >= this.props.stories.length) {
            return;
        }


        this.storiesFilter.from = currentIndex + this.state.scrollStep;

    }

    getStoryRange = (storyListItems: null | Array<IStoryListItem>, index: number) => {
        return storyListItems ? storyListItems.slice(index, index + 90) : [];
    }

    render() {
        return (<div className="story-list-wrapper">
            <AddStoryPopup onClosePopupClick={this.onClosePopupClick} isShown={this.state.isPopupShown}/>
            <div className="story-list">
                <AddStoryItem onOpenPopupClick={this.onOpenPopupClick} avatar={this.props.avatar || config.DEFAULT_AVATAR}/>
                <div 
                    ref="scroll"
                    className={`story-list-scroll ${this.state.isDown && 'active'}`}
                    onMouseDown={this.onMouseDown}
                    onMouseLeave={this.onMouseLeave}
                    onMouseUp={this.onMouseLeave}
                    onMouseMove={this.onMouseMove}
                >   
                <StoryListContent storyListItems={this.getStoryRange(this.props.stories, 0)}/>
                </div>
            </div>
        </div>);
    }
};

export default StoryList;
