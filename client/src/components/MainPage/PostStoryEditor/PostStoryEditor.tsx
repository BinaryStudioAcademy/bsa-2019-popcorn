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
import TMovie from '../../MovieSeriesPage/TMovie';
import MovieList from '../../MovieList/MovieList';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	saveImage,
	setCaption,
	changeActivity,
	setTextPosition
} from '../StoryList/story.redux/actions';
import INewStory from '../StoryList/INewStory';

interface IPostStoryEditorProps {
	id?: string;
	type: 'story' | 'post';
	newStory: INewStory;

	saveImage: (url: string) => void;
	setCaption: (text: string, start: number, end: number, title: string) => any;
	changeActivity?: (
		type: string,
		activity: null | { id: string; name: string }
	) => any;
	cursorPosition: { start: number; end: number };
	movies: null | TMovie[];
	fetchSearch?: (title: string) => any;
	title?: string;
	resetSearch?: () => any;
	saveMovie?: (movie: TMovie) => any;
	photoSaved: boolean;
	saveAfterCrop: () => void;
	isShownInput: boolean;
	setTextPosition: (position: { x: number; y: number }) => void;
}

interface IPostStoryEditorState {
	checkboxValue: boolean;
	errorMsg: string;
	isUploading: boolean;
	savePhoto: boolean;
	selectionStart: number;
	selectionEnd: number;
}

class PostStoryEditor extends React.Component<
	IPostStoryEditorProps,
	IPostStoryEditorState
> {
	private textarea = React.createRef<HTMLTextAreaElement>();
	private cropper = React.createRef<Cropper>();
	
	constructor(props: IPostStoryEditorProps) {
		super(props);
		this.state = {
			checkboxValue: false,
			errorMsg: '',
			isUploading: false,
			savePhoto: false,
			selectionStart: 0,
			selectionEnd: 0
		};

		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
		this.imageStateHandler = this.imageStateHandler.bind(this);
		this.handleDragText = this.handleDragText.bind(this);
	}

	onToggleCheckbox() {
		// this.setState({
		// 	...this.state,
		// 	checkboxValue: !this.state.checkboxValue
		// });
	}

	componentDidMount() {
		if (this.textarea.current) {
			this.textarea.current.selectionStart = this.props.cursorPosition.start;
			this.textarea.current.selectionEnd = this.props.cursorPosition.end;
		}
	}

	onCancel() {
		this.setState({
			...this.state,
			checkboxValue: false
		});

		this.props.saveImage('');
	}

	onSave() {
		this.props.saveAfterCrop();
		if (this.cropper.current) {
			this.cropper.current.getCroppedCanvas().toBlob(blob => {
				const data = new FormData();
				data.append('file', blob);
				uploadFile(data)
					.then(({ imageUrl }) => {
						this.imageStateHandler(imageUrl);
					})
					.catch(error => {
						this.setState({ isUploading: false, errorMsg: error.message });
					});
			});
		}
	}

	imageStateHandler(data) {
		this.props.saveImage(data);
	}

	static findMovie(str: string) {
		let find = str.match(/\$(.+)(.*?)(\s*?)/g);
		if (find && find[0]) {
			find = find[0].split(' ');
			if (find) {
				return find[0].slice(1);
			}
		}
		return '';
	}

	handleDragText(e, ui) {
		const newX = ui.x;
		const newY = ui.y;
		this.props.setTextPosition({
			x: newX,
			y: newY
		});
	}

	render() {
		const backgroundColor = this.props.newStory.backgroundColor;
		const isShownInput = this.props.isShownInput;
		const changeBody = (e, title) => {
			this.props.setCaption(
				e.target.value,
				this.textarea.current !== null
					? this.textarea.current.selectionStart
					: 2,
				this.textarea.current ? this.textarea.current.selectionEnd : 0,
				title
			);
		};

		return (
			<div className={'edit-form'}>
				{this.state.errorMsg && (
					<span className="upload-error">{this.state.errorMsg}</span>
				)}
				<div
					className={'upload-image-wrp'}
					style={{
						backgroundColor,
						backgroundImage:
							this.props.newStory.image_url && this.props.photoSaved
								? `url(${this.props.newStory.image_url})`
								: undefined,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover'
					}}
				>
					{this.props.newStory.image_url && (
						<div>
							{this.props.newStory.image_url.includes('tmdb.org') && this.onSave()}
							{!this.props.photoSaved && (
								<Cropper
									className="cropper"
									ref={this.cropper}
									src={this.props.newStory.image_url}
									aspectRatio={9 / 16}
								/>
							)}
							{!this.props.photoSaved && (
								<span onClick={this.onSave}>
									<FontAwesomeIcon
										icon={faCheckCircle}
										className="fontAwesomeIcon"
									/>
								</span>
							)}
							{!this.props.photoSaved && (
								<span onClick={this.onCancel}>
									<FontAwesomeIcon
										icon={faTimesCircle}
										className={'fontAwesomeIcon'}
									/>
								</span>
							)}
						</div>
					)}
					<div style={{ width: '100%', height: '100%' }}>
						<Draggable
							bounds="parent"
							defaultPosition={{
								x: this.props.newStory.textPosition.x,
								y: this.props.newStory.textPosition.y
							}}
							onStop={this.handleDragText}
							enableUserSelectHack={false}
						>
							{isShownInput ? (
								<textarea
									maxLength={30}
									style={{ color: this.props.newStory.fontColor }}
									spellCheck={false}
									ref={this.textarea}
									// placeholder="Type a text here..."
									defaultValue={this.props.newStory.caption || ''}
									className="story-text"
									onChange={e => {
										const title = PostStoryEditor.findMovie(e.target.value);
										if (title.trim() && title.trim() !== this.props.title) {
											if (this.props.fetchSearch) {
												this.props.fetchSearch(title);

												return changeBody(e, title.trim());
											}
										}
										changeBody(e, this.props.title);

										if (
											!title.trim() &&
											this.props.title &&
											this.props.resetSearch
										)
											this.props.resetSearch();
									}}
									autoFocus
									onFocus={function(e) {
										const val = e.target.value;
										e.target.value = '';
										e.target.value = val;
									}}
								/>
							) : (
								<div />
							)}
						</Draggable>

						<ImageUploader
							imageHandler={uploadFile}
							imageStateHandler={this.imageStateHandler}
						>
							<label htmlFor="image" className="upload-image-button">
								<FontAwesomeIcon icon={faCamera} className="fontAwesomeIcon" />
							</label>
						</ImageUploader>
					</div>
				</div>
				{this.props.children && (
					<div className={'activity'}>
						{this.props.children}

						<span
							onClick={() =>
								this.props.changeActivity && this.props.changeActivity('', null)
							}
						>
							<FontAwesomeIcon
								icon={faTimesCircle}
								className={'fontAwesomeIcon'}
							/>
						</span>
					</div>
				)}
				{this.props.movies && (
					<div className={'movie-list-wrp'}>
						{this.props.movies.length > 0 ? (
							<MovieList
								movies={this.props.movies}
								saveMovie={movie => {
									if (this.props.saveMovie && this.props.resetSearch) {
										this.props.saveMovie(movie);
										this.props.resetSearch();
									}
								}}
							/>
						) : (
							<div>Not found</div>
						)}
					</div>
				)}
				{/*<div className="footer">*/}
				{/*	{this.props.type === 'story' && (*/}
				{/*		<label className="container-checkbox">*/}
				{/*			Create post also*/}
				{/*			<input*/}
				{/*				type="checkbox"*/}
				{/*				onClick={this.onToggleCheckbox}*/}
				{/*				checked={this.state.checkboxValue}*/}
				{/*			/>*/}
				{/*			<span className="checkmark-checkbox"/>*/}
				{/*		</label>*/}
				{/*	)}*/}
				{/*</div>*/}
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	newStory: rootState.story.newStory,
	isShownPicker: rootState.story.isShownPicker,
	isShownFontPicker: rootState.story.isShownFontPicker,
	isShownInput: rootState.story.isShownInput,
	textPosition: rootState.story.newStory.textPosition
});

const actions = {
	saveImage,
	setCaption,
	changeActivity,
	setTextPosition
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostStoryEditor);
