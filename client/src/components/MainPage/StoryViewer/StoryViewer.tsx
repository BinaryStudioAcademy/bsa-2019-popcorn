import React, { PureComponent } from 'react';
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
import { createMessage } from '../../ChatPage/ChatPage.redux/actions';
import { bindActionCreators } from 'redux';
import WatchListIcon from '../../shared/WatchListIcon/WatchListIcon';
import RateMovie from '../../shared/RateMovie/RateMovie';
import { saveVotingReaction } from '../StoryList/story.redux/actions';
import Moment from 'react-moment';
import Image from '../../shared/Image/Image';

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
	createMessage: (userId: string, chatId: string, body: any) => void;
	saveVotingReaction: (
		userId: string,
		votingId: string,
		optionId: string
	) => any;
}

interface IState {
	isModalShown: boolean;
	isSeenByModalShown: boolean;
	currentStory: number;
	translateValue: number;
	isReactionShown: boolean;
}

class StoryViewer extends PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			isModalShown: false,
			isSeenByModalShown: false,
			currentStory: props.currentStory,
			translateValue: -props.currentStory * 350,
			isReactionShown: false
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
							<div
								className="story"
								key={i}
								onClick={() => this.setState({ isReactionShown: false })}
							>
								<header>
									<NavLink
										className="user-link"
										to={`/user-page/${story.userInfo.userId}`}
									>
										<Image
											src={story.userInfo.image_url}
											defaultSrc={config.DEFAULT_AVATAR}
											alt={story.userInfo.name}
										/>
									</NavLink>
									<NavLink
										className="user-link"
										to={`/user-page/${story.userInfo.userId}`}
									>
										<span className="username">{story.userInfo.name}</span>
									</NavLink>
									<Moment format="D MMM" local>
										{String(story.created_at)}
									</Moment>
									{story.movieOption && (
										<span style={{ marginLeft: '5px' }}>
											{story.movieOption}
										</span>
									)}
								</header>

								{story.type === 'voting' && story.voting && (
									<div>
										<StoryVoting
											saveVotingReaction={optionId => {
												const id = story.voting ? story.voting.id : '';
												this.props.saveVotingReaction(
													this.props.userId,
													id,
													optionId
												);
											}}
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
										{this.props.userId !== story.userInfo.userId && (
											<div className="story-reaction-wrp">
												{this.state.isReactionShown && (
													<StoryReaction
														chatId={this.getChatId(story.userInfo.userId)}
														story={story}
													/>
												)}
												<div
													onClick={e => {
														e.stopPropagation();
														this.setState({ isReactionShown: true });
													}}
												>
													<ChatInput
														chatId={this.getChatId(story.userInfo.userId)}
														story={story}
													/>
												</div>
											</div>
										)}
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
												overflowWrap: 'break-word',
												whiteSpace: 'pre-line'
											}}
										>
											{story.caption}
										</div>
										<div className={'seen'}>
											<p className={'seen-by-info'} style={{ width: '100%' }}>
												{this.props.userId !== story.userInfo.userId && (
													<div className="story-reaction-wrp">
														{this.state.isReactionShown && (
															<StoryReaction
																chatId={this.getChatId(story.userInfo.userId)}
																story={story}
															/>
														)}
														<div
															onClick={e => {
																e.stopPropagation();
																this.setState({ isReactionShown: true });
															}}
														>
															<ChatInput
																chatId={this.getChatId(story.userInfo.userId)}
																story={story}
															/>
														</div>
													</div>
												)}
												<span
													className={
														(story.activity || story.movie) &&
														'movie-activity-container'
													}
												>
													{story.type && story.activity && (
														<NavLink
															to={'/' + story.type + 's/' + story.activityId}
														>
															{story.activity}
														</NavLink>
													)}
													{story.movieId && story.movie && (
														<WatchListIcon movieId={story.movie.id} />
													)}
													{story.movieId && story.movie && (
														<NavLink to={'/movies/' + story.movie.id}>
															{story.movie.title}
														</NavLink>
													)}
													{story.movieId && story.movie && (
														<RateMovie movieId={story.movie.id} />
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

const actions = {
	createMessage,
	saveVotingReaction
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryViewer);
