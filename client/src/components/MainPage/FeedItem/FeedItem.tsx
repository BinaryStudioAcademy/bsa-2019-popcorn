import React from "react";
import AddComment from "../../shared/AddComment/AddComment"
import "./FeedItem.scss"
import { ReactComponent as SettingIcon } from '../../../assets/icons/general/settings.svg';
import { ReactComponent as LikeIcon } from '../../../assets/icons/general/likeIcon.svg';
import { ReactComponent as CommentIcon } from '../../../assets/icons/general/commentIcon.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/general/plusIcon.svg';
import { ReactComponent as HorizontalStroke } from '../../../assets/icons/general/horizontalStroke.svg';
import config from "../../../config";


type IFeedItemProps = {
    feedItem:{
    author: string,
    authorImage: string,
    postDate: string,
    postImage: string
    }
}

const FeedItem = ({ feedItem:{author, authorImage, postDate, postImage} }: IFeedItemProps) => {
    return <div className='feed-item'>
        <div className='feed-item-header'>
            <img className='feed-item-avatar' src={authorImage || config.DEFAULT_AVATAR} alt="author" />
            <div className='feed-item-info'>
                <div className='feed-item-author-name'>{author}</div>
                <div className='feed-item-post-time'>{postDate}</div>
            </div>
            <button className='feed-item-settings'>
                <SettingIcon/>
            </button>
        </div>
        {postImage ?
        <img className='feed-item-image' src={postImage} alt="post" />
        : null }
        <div className='feed-item-action-buttons'>
            <button><LikeIcon/></button>
            <button><CommentIcon/></button>
            <button className='feed-item-action-plus'><PlusIcon/></button>
        </div>
        <div className='feed-item-last-reaction' > <img className='feed-item-reaction-image' src={authorImage || config.DEFAULT_AVATAR} alt="author" />
            <div className='feed-item-reaction-text'>Appreciate by&nbsp;<strong>Doug Walker</strong></div>
        </div>
        <HorizontalStroke style={{width:'100%'}}/>
        <AddComment />
    </div>
}

export default FeedItem;