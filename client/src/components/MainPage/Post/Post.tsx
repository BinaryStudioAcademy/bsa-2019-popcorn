import React, { PureComponent } from 'react';
import AddComment from '../../shared/AddComment/AddComment';
import './Post.scss';
import { ReactComponent as SettingIcon } from '../../../assets/icons/general/settings.svg';
import { ReactComponent as LikeIcon } from '../../../assets/icons/general/likeIcon.svg';
import { ReactComponent as CommentIcon } from '../../../assets/icons/general/commentIcon.svg';
import { ReactComponent as ShareIcon } from '../../../assets/icons/general/shareIcon.svg';
import Comment from '../Comment/Comment';
import Tag from '../Tag/Tag';
import PostEditModal from '../PostEditModal/PostEditModal';
import PostContent from '../PostContent/PostContent';
import Reactions from '../Reactions/Reactions';
import PostReaction from './PostReaction/PostReaction';

type IPostProps = {
	post: {
		author: string;
		authorImage: string;
		postDate: string;
		postImage: string;
		body?: string;
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
		}[];
		tags?: {
			id: string;
			tagName: string;
		}[];
	};
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
	isOwnPost() {
		return true;
	}
	toggleModal = () => {
		this.setState({ isModalShown: !this.state.isModalShown });
	};
	isModalShown() {
		return this.state.isModalShown ? (
			<PostEditModal isOwn={this.isOwnPost()} />
		) : null;
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

	render() {
		const {
			post: {
				author,
				authorImage,
				postDate,
				postImage,
				body,
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
					<img className="post-item-avatar" src={authorImage} alt="author" />
					<div className="post-item-info">
						<div className="post-item-author-name">{author}</div>
						<div className="post-item-post-time">{postDate}</div>
					</div>
					<button className="post-item-settings" onClick={this.toggleModal}>
						<SettingIcon />
						{this.isModalShown()}
					</button>
				</div>
				{postImage && (
					<img className="post-item-image" src={postImage} alt="post" />
				)}
				{body && <div className="post-body">{body}</div>}
				{content && <PostContent content={content} />}
				{reactionsShow}
				<div className="post-item-action-buttons">
					<button
						onMouseEnter={this.MouseEnterLikeButton}
						onMouseLeave={this.MouseLeaveLikeButton}
					>
						<LikeIcon />
					</button>
					<button>
						<CommentIcon />
					</button>
					<button className="">
						<ShareIcon />
					</button>
				</div>
				<div className="reaction-list">
					{this.state.reactionList.map((item, index) => (
						<PostReaction key={index} quantity={355} name={item.name} />
					))}
				</div>
				<div className="post-item-last-reaction">
					<img
						className="post-item-reaction-image"
						src={authorImage}
						alt="author"
					/>
					<div className="post-item-reaction-text">
						Appreciated by&nbsp;<strong>Doug Walker</strong>
					</div>
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
				{comments && (
					<div>
						<div className="horizontal-stroke"></div>
						{comments.map(item => (
							<Comment commentItem={item} key={item.id} />
						))}
					</div>
				)}
				<div className="horizontal-stroke"></div>
				<AddComment></AddComment>
			</div>
		);
	}
}

export default Post;
