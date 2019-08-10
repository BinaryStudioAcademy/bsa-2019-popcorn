import React, { Component } from "react";
import AddComment from "../../shared/AddComment/AddComment"
import "./FeedItem.scss"
import { ReactComponent as SettingIcon } from '../../../assets/icons/general/settings.svg';
import { ReactComponent as LikeIcon } from '../../../assets/icons/general/likeIcon.svg';
import { ReactComponent as CommentIcon } from '../../../assets/icons/general/commentIcon.svg';
import { ReactComponent as ShareIcon } from '../../../assets/icons/general/shareIcon.svg';
import { ReactComponent as HorizontalStroke } from '../../../assets/icons/general/horizontalStroke.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import Comment from "../Comment/Comment";
import Tag from "../Tag/Tag";

type IFeedItemProps = {
    feedItem:{
    author: string,
    authorImage: string,
    postDate: string,
    postImage: string
    }
}


const commentItems = [
	{
		id: "12das",
		author: "marie_marie",
		commentDate: "18 hours ago",
		commentBody: "She is my favourite actress!"
	},
	{
		id: "13asdd2",
		author: "denny_de_vito",
		commentDate: "19 hours ago",
		commentBody: "She looks amazing!"
	},
]
const tagItems = [
	{
		id: "9992das",
		tagBody: "movie"
	},
	{
		id: "143asdd2",
		tagBody: "beloved"
	},
	{
		id: "143asdd2",
		tagBody: "happy"
	},
	{
		id: "143asdd2",
		tagBody: "beloved"
	},
	{
		id: "143asdd2",
		tagBody: "best"
	},
	{
		id: "143asdd2",
		tagBody: "keanu"
	},
	{
		id: "143asdd2",
		tagBody: "movies"
	},
	{
		id: "143asdd2",
		tagBody: "beloved"
	},	{
		id: "143asdd2",
		tagBody: "canne"
	},	{
		id: "143asdd2",
		tagBody: "beloved"
	},
]

const FeedItem = ({ feedItem:{author, authorImage, postDate, postImage} }: IFeedItemProps) => {
    return <div className='feed-item'>
    	<div className='feed-item-header'>
    		<img className='feed-item-avatar' src={authorImage} alt="author" />
    		<div className='feed-item-info'>
    			<div className='feed-item-author-name'>{author}</div>
    			<div className='feed-item-post-time'>{postDate}</div>
    		</div>
    		<button className='feed-item-settings'>
    			<SettingIcon />
    		</button>
    	</div>
    	<div className="post">
    		<img className='feed-item-image' src={postImage} alt="post" />
    		<div className="feed-item-content">
    			<div style={{ height: "max-content", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5em 1em", textDecoration: 'underline', color: "grey"}}>
					<img style={{marginRight: "20px", width: "186px", height: "auto"}} src="https://www.bravotv.com/sites/bravo/files/styles/blog-post-embedded--mobile/public/2019-06/sandra-bullock-keanu-reeves-date.jpg?itok=5ylIbvDh" alt=""/>
					<div>Lorem ipsum dolor sit amet, 
						consectetur adipiscing elit, sed do eiusmod 
						tempor incididunt ut labore et dolore magna aliqua. 
						Ut enim ad minim veniam, quis nostrud exercitation ... 
					</div>
				</div>
    			<div className="expand-post-content">
    				<span>Press to see more </span>
    				<FontAwesomeIcon icon={faAngleDoubleRight} />
    			</div>
    		</div>
    		<div className='feed-item-action-buttons'>
    			<button>
    				<LikeIcon /></button>
    			<button>
    				<CommentIcon /></button>
    			<button className=''>
    				<ShareIcon /></button>
    		</div>
    		<div className='feed-item-last-reaction'> <img className='feed-item-reaction-image' src={authorImage}
    				alt="author" />
    			<div className='feed-item-reaction-text'>Appreciate by&nbsp;<strong>Doug Walker</strong></div>
    		</div>
			<HorizontalStroke style={{width:'100%'}} />
			<div className="tag-items">
    			{tagItems.map(item =>
    				<Tag tagItem={item} key={item.id} />
    			)}
    		</div>
    	
    		{commentItems.map(item =>
    			<Comment commentItem={item} key={item.id} />
    		)}
    		<HorizontalStroke style={{width:'100%'}} />
    		<AddComment></AddComment>
    	</div>
    </div>
}

export default FeedItem;