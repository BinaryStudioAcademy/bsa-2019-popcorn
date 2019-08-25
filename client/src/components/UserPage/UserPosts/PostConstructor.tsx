import React from 'react';
import './PostConstructor.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUploader from '../../MainPage/ImageUploader/ImageUploader';

import ChooseExtra from './PostExtra/choose-extra';
import Extra from '././PostExtra/extra';
import {
	faPaperclip,
	faCheckCircle,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

import { setPost } from '../actions';
import { fetchPosts } from '../../MainPage/FeedBlock/FeedBlock.redux/actions';
import { getUsersPosts } from '../../UserPage/actions';
import Cropper from 'react-cropper';
import { uploadFile } from '../../../services/file.service';
import config from '../../../config';
import Image from '../../shared/Image/Image';

interface IPostConstructorProps {
	userId: string;
	setPost: (data: any) => any;
	getUsersPosts: (data: any) => any;
	fetchPosts: () => any;
	userName: string;
	userAvatar: string;
	croppedSaved: boolean;
	saveCropped: () => void;
}

interface IPostConstructorState {
	image_url: string;
	description: string;
	title: string;
	userId: string;
	extraLink: string;
	extraTitle: string;
	modalExtra: boolean;
	croppedSaved: boolean;
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
			croppedSaved: false,
			reactions: [],
			comments: []
		};
		this.imageStateHandler = this.imageStateHandler.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSaveCropped = this.onSaveCropped.bind(this);
		this.setExtraData = this.setExtraData.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	private cropper = React.createRef<Cropper>();

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

	imageStateHandler(data, croppedSaved?: boolean) {
		this.setState({
			image_url: data,
			croppedSaved: croppedSaved ? croppedSaved : this.state.croppedSaved
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
			extraTitle: '',
			croppedSaved: false
		});
	}

	onCancel() {
		this.setState({
			image_url: ''
		});
	}
	onSaveCropped() {
		if (this.cropper.current) {
			const dataUrl = this.cropper.current.getCroppedCanvas().toBlob(blob => {
				const data = new FormData();
				data.append('file', blob);
				uploadFile(data)
					.then(({ imageUrl }) => {
						if (imageUrl.indexOf('\\') !== -1) {
							let url = imageUrl.split(`\\`);
							url.shift();
							url = url.join('/');

							url = '/' + url;

							this.imageStateHandler(url, true);
						} else {
							let url = imageUrl.split(`/`);
							url.shift();
							url = url.join('/');

							url = '/' + url;

							this.imageStateHandler(url, true);
						}
					})
					.catch(error => {});
			});
		}
	}

	render() {
		return (
			<div className="postconstr-wrp">
				<div className="post-item-header">
					<Image
						src={this.props.userAvatar}
						defaultSrc={config.DEFAULT_AVATAR}
						alt="author"
						className="post-item-avatar"
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
					!this.state.croppedSaved ? (
						<div>
							<Cropper
								ref={this.cropper}
								className="postconstr-img"
								src={this.state.image_url}
							/>
							<span onClick={this.onSaveCropped}>
								<FontAwesomeIcon
									icon={faCheckCircle}
									className="fontAwesomeIcon"
								/>
							</span>
							<span onClick={this.onCancel}>
								<FontAwesomeIcon
									icon={faTimesCircle}
									className={'fontAwesomeIcon'}
								/>
							</span>
						</div>
					) : (
						<img className="postconstr-img" src={this.state.image_url} />
					)
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
