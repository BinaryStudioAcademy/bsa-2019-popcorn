import React from 'react';
import './PostConstructor.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUploader from '../../MainPage/ImageUploader/ImageUploader';

import ChooseExtra from './choose-extra';
import Extra from './extra';
import ChooseExtraOption from './choose-extra-option';

import { setPost } from '../actions';

import { uploadFile } from '../../../services/file.service';

interface IPostConstructorProps {
	id?: string;
	setPost: (data: any) => any;
}

interface IPostConstructorState {
	image_url: string;
	description: string;
	extraOption: string;
	showExtra?: boolean;
	extra?: boolean;
	showExtraOption?: boolean;
	title: string;
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
			showExtra: false,
			extra: false,
			showExtraOption: false,
			extraOption: '',
			title: 'test title'
		};
		this.imageStateHandler = this.imageStateHandler.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.addExtra = this.addExtra.bind(this);
		this.onSave = this.onSave.bind(this);
		this.setExtra = this.setExtra.bind(this);
		this.showExtraOptionModal = this.showExtraOptionModal.bind(this);
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

	addExtra() {
		this.setState({ showExtra: !this.state.showExtra });
	}

	showExtraOptionModal() {
		this.setState({
			showExtraOption: !this.state.showExtraOption
		});
	}

	uploadImage() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (true) {
					resolve({ imageUrl: 'http://placehold.it/100x100' });
				}
				reject({ message: 'error' });
			}, 1000);
		});
	}

	onSave() {
		if (this.state.description.trim() === '') return;

		this.props.setPost(this.state);

		this.setState({
			image_url: '',
			description: '',
			showExtra: false,
			extra: false,
			extraOption: ''
		});
	}

	setExtra(data) {
		data
			? this.setState({
					showExtra: !this.state.showExtra,
					extraOption: data,
					showExtraOption: !this.state.showExtraOption
			  })
			: this.setState({
					extraOption: ''
			  });
	}

	render() {
		return (
			<div className="postconstr">
				{this.state.image_url ? (
					<img
						className="postconstr-img"
						src={this.state.image_url}
						alt="post image"
					/>
				) : null}
				<textarea
					placeholder="Type a text here..."
					value={this.state.description}
					onChange={e => this.onChangeData(e.target.value, 'description')}
				/>

				{this.state.extraOption ? (
					<Extra title={this.state.extraOption} setExtra={this.setExtra} />
				) : null}
				{this.state.showExtra ? (
					<ChooseExtra
						setExtra={this.setExtra}
						addExtra={() => this.addExtra()}
					/>
				) : null}
				{this.state.showExtraOption ? (
					<ChooseExtraOption
						showExtraOptionModal={this.showExtraOptionModal}
						option={this.state.extraOption}
					/>
				) : null}

				<div className="postconstr-btn-group">
					<div className="postconstr-btn-sm">
						{!this.state.extra ? (
							<button className={'btn'} onClick={() => this.addExtra()}>
								Add extra
							</button>
						) : null}
						<ImageUploader
							imageHandler={uploadFile}
							imageStateHandler={this.imageStateHandler}
						/>
					</div>
					<button className="save-btn" onClick={this.onSave}>
						Save
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
	setPost
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostConstructor);
