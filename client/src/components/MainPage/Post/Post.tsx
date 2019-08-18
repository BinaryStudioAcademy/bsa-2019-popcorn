import React, { PureComponent } from 'react';
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

type IPostProps = {
	post: {
		user: {
			name: string;
			avatar: string;
			id: string;
			any;
		};
		created_At?: string;
		image_url: string;
		description?: string;
		content?: {
			image: string;
			link: string;
			description: string;
		};
		comments?: {
			id: string;
			author: string;
			commentDate: string;
			commentBody: string;
			parentId?: string;
		}[];
		tags?: {
			id: string;
			tagName: string;
		}[];
	};
	userId: string;
	userRole: string;
};
interface IReactItem {
	id: number;
	name: string;
}
interface IPostState {
	isModalShown: boolean;
	hover: boolean;
	reactionList: Array<IReactItem>;
}

class Post extends PureComponent<IPostProps, IPostState> {
	constructor(props: IPostProps) {
		super(props);
		this.state = {
			isModalShown: false,
			hover: false,
			reactionList: []
		};
	}
	MouseEnterLikeButton = () => {
		this.setState({ hover: true });
	};

	MouseLeaveLikeButton = () => {
		this.setState({ hover: false });
	};

	onReactionClick = (reaction: IReactItem) => {
		const reactionList = this.state.reactionList;

		if (reactionList.findIndex(item => item.id === reaction.id) != -1) {
			return;
		}

		reactionList.push(reaction);
		this.setState({ reactionList });
	};

	isOwnPost() {
		const { userId, userRole, post: { user: postOwner } } = this.props;
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
			post: {
				user,
				created_At,
				image_url,
				description,
				content,
				comments,
				tags
			}
		} = this.props;
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
					{this.state.reactionList.map((item, index) => (
						<PostReaction key={index} quantity={1} name={item.name} />
					))}
				</div>
				{tags && (
					<div>
						<div className="horizontal-stroke"></div>
						<div className="tag-items">
							{tags.map(item => (
								<Tag tagItem={item} key={item.id} />
							))}
						</div>
					</div>
				)}
				{this.nestedComments && (
					<div>
						{this.nestedComments.map(item => (
							<div style={{ width: '100%' }}>
								<div className="horizontal-stroke"></div>
								<Comment commentItem={item} key={item.id} />
							</div>
						))}
					</div>
				)}
				<AddComment></AddComment>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id,
	userRole: rootState.profile.profileInfo.role
});

export default connect(
	mapStateToProps,
)(Post);
