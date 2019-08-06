import React, { PureComponent } from 'react';
import TimeAgo from 'react-time-ago';
import StoryViewerModal from '../StoryViewerModal/StoryViewerModal';
import StorySeenByModal from '../StorySeenByModal/StorySeenByModal';
import "./StoryViewer.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEllipsisH, faEye } from '@fortawesome/free-solid-svg-icons';


interface IProps {
    storyInfo: {
        image_url: string,
        bckg_color: string,
        users: Array<{ name: string, image_url: string }>,
        created_at: Date
    },
    userInfo: {
        userId: string,
        name: string,
        image_url: string
    }, 
    currentUser: {
        userId: string
    }
};

interface IState {
    isModalShown: boolean,
    isSeenByModalShown: boolean
};


class StoryViewer extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { 
            isModalShown: false,
            isSeenByModalShown: false
        };
    }

    isOwnStory() {
        return this.props.currentUser.userId === this.props.userInfo.userId;
    }

    toogleModal = () => {
        this.setState({ isModalShown: !this.state.isModalShown });
    }

    toogleSeenByModal = () => {
        this.setState({ isSeenByModalShown: !this.state.isSeenByModalShown });
    }

    isModalShown() {
        return this.state.isModalShown ? 
            <StoryViewerModal 
                isOwn={this.isOwnStory()} 
                closeModal={this.toogleModal} 
            /> :
            null;
    }

    isSeenByModalShown() {
        return this.state.isSeenByModalShown ? 
            <StorySeenByModal 
                users={this.props.storyInfo.users}
                closeModal={this.toogleSeenByModal} 
            /> :
            null;
    }

    render() {
        const { storyInfo, userInfo } = this.props;

        const style = {
            backgroundImage: 'url(' + storyInfo.image_url + ')',
            backgroundColor: storyInfo.bckg_color
        };

        return (
            <div className="story-viewer">
                <div className="story">
                    <header>
                        <img src={userInfo.image_url} alt=''></img>
                        <span className="username">{userInfo.name}</span>
                        <TimeAgo date={storyInfo.created_at} timeStyle="twitter" />
                        <p className="ellipsis" onClick={this.toogleModal}>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </p>
                    </header>
                    <main style={style}>
                        { this.isOwnStory() && <div className="seen">
                            <p className="seen-by-info" onClick={this.toogleSeenByModal}>
                                <FontAwesomeIcon icon={faEye} />
                                <span className="seen-by-amount">43</span>
                            </p>
                        </div> }
                    </main>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                {this.isModalShown()}
                {this.isSeenByModalShown()}
            </div>
        )
    }
};

export default StoryViewer;