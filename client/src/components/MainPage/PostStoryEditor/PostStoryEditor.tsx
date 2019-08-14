import React from 'react';
import './PostStoryEditor.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import ImageUploader from '../ImageUploader/ImageUploader';

interface IPostStoryEditorProps {
	id?: string;
	type: 'story' | 'post';
	uploadImage?: (s: any) => any;
	addExtra?: () => any;
	body: string;
	imageUrl?: string | null;
	changeBody: (text: string) => any;
}

interface IPostStoryEditorState {
	checkboxValue: boolean;
	imageUrl: string;
	errorMsg: string;
	isUploading: boolean;
}

class PostStoryEditor extends React.Component<
	IPostStoryEditorProps,
	IPostStoryEditorState
> {
	constructor(props: IPostStoryEditorProps) {
		super(props);
		this.state = {
			checkboxValue: false,
			imageUrl: '',
			errorMsg: '',
			isUploading: false
		};

		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onChangeData = this.onChangeData.bind(this);
		this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
		this.imageStateHandler = this.imageStateHandler.bind(this);
	}

	componentDidMount() {
		if (this.props.id) {
			switch (this.props.type) {
				case 'post':
					// fetch post by id
					this.setState({
						...this.state
					});
					break;

				case 'story':
					// fetch story by id
					this.setState({
						...this.state
					});
					break;

				default:
					break;
			}
		}
	}

	onChangeData(value: string, keyword: string) {
		this.setState({
			...this.state,
			[keyword]: value
		});
	}

	onToggleCheckbox() {
		this.setState({
			...this.state,
			checkboxValue: !this.state.checkboxValue
		});
	}

	onCancel() {
		this.setState({
			...this.state,
			imageUrl: '',
			checkboxValue: false
		});
		console.log('redirected');
		//redirect to main page
	}

	onSave() {
		if (this.props.body.trim() === '') return;
		switch (this.props.type) {
			case 'post':
				this.props.id
					? console.log(this.state, 'post updated') //this.props.updatePost(this.props.id, this.state);
					: console.log(this.state, 'post created'); //this.props.addPost(this.state);
				break;

			case 'story':
				if (this.state.checkboxValue) console.log(this.state, 'post created'); //this.props.addPost(this.state);
				this.props.id
					? console.log(this.state, 'story updated') //this.props.updateStory(this.props.id, this.state);
					: console.log(this.state, 'story created'); //this.props.addStory(this.state);
				break;

			default:
				break;
		}
		this.onCancel();
	}

	imageStateHandler(data) {
		this.setState({
			imageUrl: data
		});
	}

	render() {
		return (
			<div className={'edit-form'}>
				{this.state.errorMsg && (
					<span className="upload-error">{this.state.errorMsg}</span>
				)}
				{this.state.imageUrl ? (
					<div className={'profilePhotoWrap'}>
						<img
							src={this.state.imageUrl}
							style={{ width: '100%', height: '100%' }}
							alt=""
						/>
						<span>
							<FontAwesomeIcon
								icon={faCheckCircle}
								className="fontAwesomeIcon"
							/>
						</span>
						<span>
							<FontAwesomeIcon
								icon={faTimesCircle}
								className={'fontAwesomeIcon'}
							/>
						</span>
					</div>
				) : (
					<div className={'upload-image-wrp'}>
						<ImageUploader
							imageHandler={this.props.uploadImage}
							imageStateHandler={this.imageStateHandler}
						>
							<label htmlFor="image" className="upload-image-button">
								<FontAwesomeIcon icon={faCamera} className="fontAwesomeIcon" />
							</label>
						</ImageUploader>
					</div>
				)}
				<textarea
					placeholder="Type a text here..."
					value={this.props.body}
					onChange={e => this.props.changeBody(e.target.value)}
				/>
				<div>
					<button
						className={'btn'}
						onClick={() => (this.props.addExtra ? this.props.addExtra() : null)}
					>
						Add extra
					</button>
				</div>
				<div className="footer">
					{this.props.type === 'story' && (
						<p className="checker">
							Create post also{' '}
							<input
								type="checkbox"
								checked={this.state.checkboxValue}
								onChange={this.onToggleCheckbox}
							/>
						</p>
					)}
				</div>
			</div>
		);
	}
}

export default PostStoryEditor;
