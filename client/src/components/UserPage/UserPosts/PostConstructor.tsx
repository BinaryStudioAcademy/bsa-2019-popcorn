import React from 'react';
import './PostConstructor.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUploader from '../../MainPage/ImageUploader/ImageUploader';

import ChooseExtra from './PostExtra/choose-extra';
import Extra from '././PostExtra/extra';

import { setPost } from '../actions';
import { fetchPosts } from '../../MainPage/FeedBlock/FeedBlock.redux/actions';
import { getUsersPosts } from '../../UserPage/actions';

import { uploadFile } from '../../../services/file.service';

interface IPostConstructorProps {
	userId: string;
	setPost: (data: any) => any;
	getUsersPosts: (data: any) => any;
	fetchPosts: () => any;
}

interface IPostConstructorState {
	image_url: string;
	description: string;
	title: string;
	userId: string;
	extraLink: string;
	extraTitle: string;
	modalExtra: boolean;
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
			modalExtra: false
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
			<div className="postconstr">
				{this.state.image_url ? (
					<img
						className="postconstr-img"
						src={this.state.image_url}
						alt="post content"
					/>
				) : null}
				<textarea
					placeholder="Type a text here..."
					value={this.state.description}
					onChange={e => this.onChangeData(e.target.value, 'description')}
				/>

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
				<div className="postconstr-btn-group">
					<div className="postconstr-btn-sm">
						<button className={'btn'} onClick={() => this.toggleModal()}>
							Add extra
						</button>
						<ImageUploader
							imageHandler={uploadFile}
							imageStateHandler={this.imageStateHandler}
						/>
					</div>
					<button className="save-btn" onClick={this.onSave}>
						Post
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
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
