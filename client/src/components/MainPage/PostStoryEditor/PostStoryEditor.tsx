import React from 'react';
import './PostStoryEditor.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';

// example:
{
	/* <PostStoryEditor id={'1'} type={'story'} uploadImage={event}/> */
}

interface IPostStoryEditorProps {
	id?: string;
	type: 'story' | 'post';
	uploadImage?: (s: any) => any;
	addExtra?: () => any;
}

interface IPostStoryEditorState {
	body: string;
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
			body: '',
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
						...this.state,
						body: 'test post'
					});
					break;

				case 'story':
					// fetch story by id
					this.setState({
						...this.state,
						body: 'test story'
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
			body: '',
			checkboxValue: false
		});
		console.log('redirected');
		//redirect to main page
	}

	onSave() {
		if (this.state.body.trim() === '') return;
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

	handleUploadFile({ target }) {
		this.setState({ isUploading: true, errorMsg: '' });

		if (target.files[0] && target.files[0].size > 1048576 * 3) {
			target.value = '';
			this.setState({
				isUploading: false,
				errorMsg: 'File is too big! (max 3MB)'
			});
			return;
		}

		const data = new FormData();
		data.append('file', target.files[0]);

		if (this.props.uploadImage)
			this.props
				.uploadImage(data)
				.then(({ imageUrl }) => {
					this.setState({ imageUrl, isUploading: false, errorMsg: '' });
				})
				.catch(error => {
					this.setState({ isUploading: false, errorMsg: error.message });
				});

		target.value = '';
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
						<input
							name="image"
							type="file"
							onChange={e => this.handleUploadFile(e)}
							className="upload-image"
							id="image"
							accept=".jpg, .jpeg, .png"
							disabled={!!this.state.imageUrl}
							hidden
						/>
						<label htmlFor="image" className="upload-image-button">
							<FontAwesomeIcon icon={faCamera} className="fontAwesomeIcon" />
						</label>
					</div>
				)}
				<textarea
					placeholder="Type a text here..."
					value={this.state.body}
					onChange={e => this.onChangeData(e.target.value, 'body')}
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
						<p className="checker" onClick={this.onToggleCheckbox}>
							Create post also{' '}
							<input type="checkbox" checked={this.state.checkboxValue} />
						</p>
					)}
				</div>
				{/*<div>*/}
				{/*    <input*/}
				{/*        name="image"*/}
				{/*        type="file"*/}
				{/*        onChange={this.handleUploadFile}*/}
				{/*        className="upload-image"*/}
				{/*        id="image"*/}
				{/*        accept=".jpg, .jpeg, .png"*/}
				{/*        disabled={this.state.isUploading}*/}
				{/*    />*/}
				{/*    <label htmlFor="image" className="upload-image-button">*/}
				{/*        Upload image*/}
				{/*    </label>*/}
				{/*    <button className="cancel-btn" onClick={this.onCancel}>*/}
				{/*        Cancel*/}
				{/*    </button>*/}
				{/*    <button className="save-btn" onClick={this.onSave}>*/}
				{/*        Save*/}
				{/*    </button>*/}
				{/*</div>*/}
				{/* <div>
						<ImageUploader
							imageHandler={this.props.uploadImage}
							imageStateHandler={this.imageStateHandler}
						/>
						<button className="cancel-btn" onClick={this.onCancel}>
							Cancel
						</button>
						<button className="save-btn" onClick={this.onSave}>
							Save
						</button>
					</div>*/}
			</div>
		);
	}
}

export default PostStoryEditor;
