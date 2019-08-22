import React, { Component } from 'react';
import AddComment from '../../shared/AddComment/AddComment';
import './Post.scss';
import { ReactComponent as SettingIcon } from '../../../assets/icons/general/settings.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import Comment from '../Comment/Comment';
import Tag from '../Tag/Tag';
import PostEditModal from '../PostEditModal/PostEditModal';
import PostContent from '../PostContent/PostContent';
import config from '../../../config';
import Reactions from '../Reactions/Reactions';
import PostReaction from './PostReaction/PostReaction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IPost from './IPost';
import IComment from './IComment';
import {
	addNewReaction,
	createReaction
} from '../FeedBlock/FeedBlock.redux/actions';
import { bindActionCreators } from 'redux';
import IReaction from './IReaction';

type IPostProps = {
	post: IPost;
	userId: string;
	userRole: string;
	createComment?: (userId: string, text: string, postId: string) => any;
	addNewComment?: (comment: IComment) => any;
	createReaction?: (type: string, userId: string, postId: string) => any;
	addNewReaction?: (reaction: IReaction) => any;
};

interface IReactItem {
	name: string;
}

interface IPostState {
	isModalShown: boolean;
	hover: boolean;
}

class Post extends Component<IPostProps, IPostState> {
	constructor(props: IPostProps) {
		super(props);
		this.state = {
			isModalShown: false,
			hover: false
		};
	}

	MouseEnterLikeButton = () => {
		this.setState({ hover: true });
	};

	MouseLeaveLikeButton = () => {
		this.setState({ hover: false });
	};

	onReactionClick = (reaction: IReactItem) => {
		if (this.props.createReaction)
			this.props.createReaction(
				reaction.name,
				this.props.userId,
				this.props.post.id
			);
	};

	isOwnPost() {
		const {
			userId,
			userRole,
			post: { user: postOwner }
		} = this.props;
		return userRole === 'admin' || userId === postOwner.id;
	}

	toggleModal = () => {
		this.setState({ isModalShown: !this.state.isModalShown });
	};

	isModalShown() {
		return this.state.isModalShown ? (
			<PostEditModal isOwn={this.isOwnPost()} />
		) : null;
	}

	nestComments(commentList) {
		const commentMap = {};
		commentList.forEach(comment => (commentMap[comment.id] = comment));
		commentList.forEach(comment => {
			if (comment.parentId != null) {
				const parent = commentMap[comment.parentId];
				if (!parent.children) {
					parent.children = [];
				}
				parent.children.push(comment);
			}
		});
		return commentList.filter(comment => {
			return comment.parentId == null;
		});
	}

	nestedComments = this.props.post.comments
		? this.nestComments(this.props.post.comments)
		: this.props.post.comments;

	render() {
		const {
			id,
			user,
			created_At,
			image_url,
			description,
			content,
			comments,
			tags
		} = this.props.post;
		const createComment = this.props.createComment;

		const reactionsShow = this.state.hover ? (
			<Reactions
				onReactionClick={this.onReactionClick}
				MouseLeaveLikeButton={this.MouseLeaveLikeButton}
				MouseEnterLikeButton={this.MouseEnterLikeButton}
			/>
		) : null;
		return (
			<div className="post-item">
				<div className="post-item-header">
					<Link className="user-link" to={`/user-page/${user.id}`}>
						<img
							className="post-item-avatar"
							src={(user && user.avatar) || config.DEFAULT_AVATAR}
							alt="author"
						/>
						<div className="post-item-info">
							<div className="post-item-author-name">{user.name}</div>
							{created_At && (
								<div className="post-item-post-time">{created_At}</div>
							)}
						</div>
					</Link>
					<button className="post-item-settings" onClick={this.toggleModal}>
						<SettingIcon />
					</button>
					{this.isModalShown()}
				</div>
				{image_url && (
					<img className="post-item-image" src={image_url} alt="post" />
				)}
				{description && <div className="post-body">{description}</div>}
				{content && <PostContent content={content} />}
				{reactionsShow}
				<div className="post-item-action-buttons">
					<div className="post-item-last-reaction">
						<button
							className="like-icon"
							onMouseEnter={this.MouseEnterLikeButton}
							onMouseLeave={this.MouseLeaveLikeButton}
						>
							<FontAwesomeIcon icon={faHeart} />
						</button>
						<div className="post-item-reaction-text">
							Appreciated by&nbsp;<strong>Doug Walker </strong>
							and <strong>13 others</strong>
						</div>
					</div>
					<button className="">
						<FontAwesomeIcon icon={faShare} />
					</button>
				</div>
				<div className="reaction-list">
					{this.props.post.reactions.map((item, index) => (
						<PostReaction
							key={item.type}
							quantity={item.count}
							name={item.type}
							onReactionClick={this.onReactionClick}
						/>
					))}
				</div>
				{comments ? (
					<div>
						{comments.map(comment => (
							<Comment key={comment.id} commentItem={comment} />
						))}
					</div>
				) : null}
				{tags && (
					<div>
						<div className="horizontal-stroke" />
						<div className="tag-items">
							{tags.map(item => (
								<Tag tagItem={item} key={item.id} />
							))}
						</div>
					</div>
				)}
				{/*{this.nestedComments && (*/}
				{/*	<div>*/}
				{/*		{this.nestedComments.map(item => (*/}
				{/*			<div style={{ width: '100%' }}>*/}
				{/*				<div className={'horizontal-stroke'} />*/}
				{/*				<Comment commentItem={item} key={item.id} />*/}
				{/*			</div>*/}
				{/*		))}*/}
				{/*	</div>*/}
				{/*)}*/}
				<AddComment
					createComment={text => {
						createComment && createComment(this.props.userId, text, id);
					}}
				/>
			</div>
		);
	}
}

export default Post;
