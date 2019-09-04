import React, { PureComponent } from 'react';
import TimeAgo from 'react-time-ago';
import StoryViewerModal from '../StoryViewerModal/StoryViewerModal';
import StorySeenByModal from '../StorySeenByModal/StorySeenByModal';
import './StoryViewer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	faEllipsisH,
	faEye,
	faTimes
} from '@fortawesome/free-solid-svg-icons';
import config from '../../../config';
import StoryVoting from '../../StoryVoting/StoryVoting';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ChatInput from '../../ChatPage/Chat/ChatInput';
import StoryReaction from './StoryReaction';

interface IProps {
	stories: Array<{
		id: string;
		image_url: string;
		backgroundColor: string;
		fontColor: string;
		textPositionX?: number;
		caption: string;
		textPositionY?: number;
		users: Array<{ name: string; image_url: string }>;
		userInfo: {
			userId: string;
			name: string;
			image_url: string;
		};
		created_at: Date;
		type: string;
		voting?: {
			backColor: string;
			backImage: string;
			deltaPositionHeadX: number;
			deltaPositionHeadY: number;
			deltaPositionOptionBlockX: number;
			deltaPositionOptionBlockY: number;
			header: string;
			id: string;
			options: Array<{
				body: string;
				voted: number;
			}>;
		};
		activity?: string;
		activityId?: string;
		movieId?: string;
		movie?: {
			title: string;
			id: string;
		};
		movieOption?: string;
	}>;
	currentUser: {
		userId: string;
	};
	currentStory: number;
	userId: string;
	userRole: string;
	closeViewer: () => void;
	chats: any;
}

interface IState {
	isModalShown: boolean;
	isSeenByModalShown: boolean;
	currentStory: number;
	translateValue: number;
}

class StoryViewer extends PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			isModalShown: false,
			isSeenByModalShown: false,
			currentStory: props.currentStory,
			translateValue: -props.currentStory * 350
		};
	}

	isOwnStory(story) {
		const { userId, userRole } = this.props;
		return userRole === 'admin' || userId === story.userInfo.userId;
	}

	toogleModal = () => {
		this.setState({ isModalShown: !this.state.isModalShown });
	};

	toogleSeenByModal = () => {
		this.setState({ isSeenByModalShown: !this.state.isSeenByModalShown });
	};

	isModalShown(story) {
		return this.state.isModalShown ? (
			<StoryViewerModal
				isOwn={this.isOwnStory(story)}
				closeModal={this.toogleModal}
			/>
		) : null;
	}

	isSeenByModalShown(story) {
		return this.state.isSeenByModalShown ? (
			<StorySeenByModal
				users={story.users}
				closeModal={this.toogleSeenByModal}
			/>
		) : null;
	}

	goToPrevStory = () => {
		if (this.state.currentStory === 0) return;
		this.setState(prevState => ({
			currentStory: prevState.currentStory - 1,
			translateValue: prevState.translateValue + 350
		}));
	};

	goToNextStory = () => {
		if (this.state.currentStory === this.props.stories.length - 1) return;
		this.setState(prevState => ({
			currentStory: prevState.currentStory + 1,
			translateValue: prevState.translateValue - 350
		}));
	};

	getChatId = id => {
		for (const chatId in this.props.chats) {
			if (this.props.chats[chatId].user.id === id) {
				return chatId;
			}
		}
	};

	render() {
		const { stories } = this.props;
		console.log(stories);

		return (
			<div className="story-viewer">
				<p className="left-arrow" onClick={this.goToPrevStory}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</p>
				<div className="story-slider">
					<div
						className="slider-wrapper"
						style={{
							transform: `translateX(${this.state.translateValue}px)`,
							transition: 'transform ease-out 0.45s'
						}}
					>
						{stories.map((story, i) => (
							<div className="story" key={i}>
								<header>
									<img
										src={story.userInfo.image_url || config.DEFAULT_AVATAR}
										alt=""
									/>
									<span className="username">{story.userInfo.name}</span>
									<TimeAgo date={story.created_at} timeStyle="twitter" />
									{story.movieOption && (
										<span style={{ marginLeft: '5px' }}>
											{story.movieOption}
										</span>
									)}
									<p className="ellipsis" onClick={this.toogleModal}>
										<FontAwesomeIcon icon={faEllipsisH} />
									</p>
								</header>

								{story.type === 'voting' && story.voting && (
									<div>
										<StoryVoting
											backgroundColor={story.backgroundColor}
											header={story.voting.header}
											options={story.voting.options}
											deltaPositionForHeader={{
												x: story.voting.deltaPositionHeadX,
												y: story.voting.deltaPositionHeadY
											}}
											deltaPositionForOptionBlock={{
												x: story.voting.deltaPositionOptionBlockX,
												y: story.voting.deltaPositionOptionBlockY
											}}
											backColor={story.voting.backColor}
											userId={this.props.currentUser.userId}
											inEditor={false}
											image_url={story.voting.backImage || ''}
										/>
										<StoryReaction
											chatId={this.getChatId(story.userInfo.userId)}
											storyId={story.id}
										/>
										<ChatInput
											chatId={this.getChatId(story.userInfo.userId)}
											storyId={story.id}
										/>
									</div>
								)}
								{story.type === 'voting' ? null : (
									<main
										style={{
											backgroundImage: 'url(' + story.image_url + ')',
											backgroundColor: story.backgroundColor,
											flexDirection: 'column',
											justifyContent: 'space-between'
										}}
									>
										<div
											className="story-caption"
											style={{
												fontSize: '37px',
												position: 'static',
												marginTop: story.textPositionY
													? story.textPositionY * 1.25 + 'px'
													: 0,
												marginLeft: story.textPositionX
													? story.textPositionX * 1.25 + 'px'
													: 0,
												color: story.fontColor,
												textAlign: 'center',
												width: '280px',
												maxWidth: '350px',
												maxHeight: '100px',
												wordBreak: 'break-all',
												overflowWrap: 'break-word',
												whiteSpace: 'pre-line'
											}}
										>
											{story.caption}
										</div>
										<div className={'seen'}>
											<p className={'seen-by-info'} style={{ width: '100%' }}>
												<StoryReaction
													chatId={this.getChatId(story.userInfo.userId)}
													storyId={story.id}
												/>
												<ChatInput
													chatId={this.getChatId(story.userInfo.userId)}
													storyId={story.id}
												/>
												<span
													style={{
														display: 'flex',
														justifyContent: 'SPACE-BETWEEN',
														padding: '0 15px',
														width: '100%'
													}}
												>
													{story.type && (
														<NavLink
															to={'/' + story.type + 's/' + story.activityId}
														>
															{story.activity}
														</NavLink>
													)}
													{story.movieId && story.movie && (
														<NavLink to={'/movies/' + story.movie.id}>
															{story.movie.title}
														</NavLink>
													)}
												</span>
											</p>
										</div>
									</main>
								)}
							</div>
						))}
					</div>
				</div>
				<div className="stories-right-icons">
					<p className="close-stories" onClick={this.props.closeViewer}>
						<FontAwesomeIcon icon={faTimes} />
					</p>
					<p className="right-arrow" onClick={this.goToNextStory}>
						<FontAwesomeIcon icon={faChevronRight} />
					</p>
				</div>
				{this.isModalShown(stories[this.state.currentStory])}
				{this.isSeenByModalShown(stories[this.state.currentStory])}
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id,
	userRole: rootState.profile.profileInfo.role,
	chats: rootState.chat.chats
});

export default connect(mapStateToProps)(StoryViewer);
