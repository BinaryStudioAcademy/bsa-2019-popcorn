import React from 'react';
import './PostConstructor.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUploader from '../../MainPage/ImageUploader/ImageUploader';

import ChooseExtra from './PostExtra/choose-extra';
import Extra from '././PostExtra/extra';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

import { setPost } from '../actions';
import { fetchPosts } from '../../MainPage/FeedBlock/FeedBlock.redux/actions';
import { getUsersPosts } from '../../UserPage/actions';

import { uploadFile } from '../../../services/file.service';

interface IPostConstructorProps {
	userId: string;
	setPost: (data: any) => any;
	getUsersPosts: (data: any) => any;
	fetchPosts: () => any;
	userName: string;
	userAvatar: string;
}

interface IPostConstructorState {
	image_url: string;
	description: string;
	title: string;
	userId: string;
	extraLink: string;
	extraTitle: string;
	modalExtra: boolean;
	reactions: Array<any>;
	comments: Array<any>;
}

class PostConstructor extends React.Component<
	IPostConstructorProps,
	IPostConstructorState
> {
	constructor(props: IPostConstructorProps) {
		super(props);
		this.state = {
			image_url: '',
			description: '',
			title: 'test title',
			userId: this.props.userId,
			extraLink: '',
			extraTitle: '',
			modalExtra: false,
			reactions: [],
			comments: []
		};
		this.imageStateHandler = this.imageStateHandler.bind(this);
		this.onSave = this.onSave.bind(this);
		this.setExtraData = this.setExtraData.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	setExtraData(data) {
		data
			? this.setState({
					extraLink: data.link,
					extraTitle: data.title
			  })
			: this.setState({
					extraLink: '',
					extraTitle: ''
			  });
	}

	toggleModal() {
		this.setState({
			modalExtra: !this.state.modalExtra
		});
	}

	imageStateHandler(data) {
		this.setState({
			image_url: data
		});
	}

	onChangeData(value: string, keyword: string) {
		this.setState({
			...this.state,
			[keyword]: value
		});
	}

	onSave() {
		if (this.state.description.trim() === '') return;
		this.props.setPost(this.state);
		this.props.fetchPosts();
		this.setState({
			image_url: '',
			description: '',
			extraLink: '',
			extraTitle: ''
		});
	}

	render() {
		return (
			<div className="postconstr-wrp">
				<div className="post-item-header">
					<img
						className="post-item-avatar"
						src={this.props.userAvatar}
						alt="author"
					/>
					<div className="post-item-info">
						<div className="post-item-author-name">{this.props.userName}</div>
					</div>
				</div>
				<div className="postconstr">
					<textarea
						placeholder="Create new post..."
						value={this.state.description}
						onChange={e => this.onChangeData(e.target.value, 'description')}
					/>
					<div className="extra-buttons">
						<ImageUploader
							isIcon={true}
							imageHandler={uploadFile}
							imageStateHandler={this.imageStateHandler}
						/>
						<button className={'btn'} onClick={() => this.toggleModal()}>
							<FontAwesomeIcon icon={faPaperclip} />
						</button>
					</div>
				</div>
				{this.state.extraLink ? (
					<Extra
						title={this.state.extraTitle}
						link={this.state.extraLink}
						clearExtra={this.setExtraData}
					/>
				) : null}
				{this.state.modalExtra ? (
					<ChooseExtra
						toggleModal={this.toggleModal}
						setExtra={this.setExtraData}
					/>
				) : null}
				{this.state.image_url ? (
					<img
						className="postconstr-img"
						src={this.state.image_url}
						alt="post content"
					/>
				) : null}
				<div className="save-wrp">
					<button className="save-btn" onClick={this.onSave}>
						Post
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userName: rootState.profile.profileInfo.name,
	userAvatar: rootState.profile.profileInfo.avatar
});

const actions = {
	setPost,
	getUsersPosts,
	fetchPosts
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostConstructor);
