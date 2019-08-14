import React from 'react';
import './PostStoryEditor.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import ImageUploader from '../ImageUploader/ImageUploader';
import { uploadFile } from '../../../services/file.service';

interface IPostStoryEditorProps {
	id?: string;
	type: 'story' | 'post';
	saveImage: (url: string) => void;
	addExtra?: () => any;
	body: string;
	imageUrl: string;
	changeBody: (text: string) => any;
}

interface IPostStoryEditorState {
	checkboxValue: boolean;
	errorMsg: string;
	isUploading: boolean;
	savePhoto: boolean;
}

class PostStoryEditor extends React.Component<
	IPostStoryEditorProps,
	IPostStoryEditorState
> {
	constructor(props: IPostStoryEditorProps) {
		super(props);
		this.state = {
			checkboxValue: false,
			errorMsg: '',
			isUploading: false,
			savePhoto: false
		};

		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
		this.imageStateHandler = this.imageStateHandler.bind(this);
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
			checkboxValue: false
		});

		this.props.saveImage('');
	}

	onSave() {
		this.setState({ savePhoto: true });
	}

	imageStateHandler(data) {
		this.props.saveImage(data);
	}

	render() {
		return (
			<div className={'edit-form'}>
				{this.state.errorMsg && (
					<span className="upload-error">{this.state.errorMsg}</span>
				)}
				{this.props.imageUrl ? (
					<div className={'profilePhotoWrap'}>
						<img
							src={this.props.imageUrl}
							style={{ width: '100%', height: '100%' }}
							alt=""
						/>
						{this.state.savePhoto && (
							<span onClick={this.onSave}>
								<FontAwesomeIcon
									icon={faCheckCircle}
									className="fontAwesomeIcon"
								/>
							</span>
						)}
						{this.state.savePhoto && (
							<span onClick={this.onCancel}>
								<FontAwesomeIcon
									icon={faTimesCircle}
									className={'fontAwesomeIcon'}
								/>
							</span>
						)}
					</div>
				) : (
					<div className={'upload-image-wrp'}>
						<ImageUploader
							imageHandler={uploadFile}
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
