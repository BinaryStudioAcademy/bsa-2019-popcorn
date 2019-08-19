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

interface IPostStoryEditorProps {
	id?: string;
	type: 'story' | 'post';
	saveImage: (url: string) => void;
	body: string;
	imageUrl: string;
	changeBody: (text: string, start: number, end: number) => any;
	changeActivity?: (
		type: string,
		activity: null | { id: string; name: string }
	) => any;
	cursorPosition: { start: number; end: number };
	movies: null | Array<TMovie>;
	fetchSearch?: (title: string) => any;
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
	}

	private textarea = React.createRef<HTMLTextAreaElement>();

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
		this.setState({ savePhoto: true });
	}

	imageStateHandler(data) {
		this.props.saveImage(data);
	}

	static findMovie(str: string) {
		let find = str.match(/\$(.+)(.*?)(\s*?)/g);
		if (find && find[0]) {
			find = find[0].split(' ');
			if (find) return find[0].slice(1);
		}
		return '';
	}

	render() {
		return (
			<div className={'edit-form'}>
				{this.state.errorMsg && (
					<span className="upload-error">{this.state.errorMsg}</span>
				)}
				{this.props.imageUrl ? (
					<div className={'photo-wrp'}>
						<img src={this.props.imageUrl} alt="" />
						{!this.state.savePhoto && (
							<span onClick={this.onSave}>
								<FontAwesomeIcon
									icon={faCheckCircle}
									className="fontAwesomeIcon"
								/>
							</span>
						)}
						{!this.state.savePhoto && (
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
					ref={this.textarea}
					placeholder="Type a text here..."
					defaultValue={this.props.body}
					onChange={e => {
						const title = PostStoryEditor.findMovie(e.target.value);
						if (title.trim() && this.props.fetchSearch)
							this.props.fetchSearch(title);

						this.props.changeBody(
							e.target.value,
							this.textarea.current !== null
								? this.textarea.current.selectionStart
								: 2,
							this.textarea.current ? this.textarea.current.selectionEnd : 0
						);
					}}
					autoFocus
					onFocus={function(e) {
						const val = e.target.value;
						e.target.value = '';
						e.target.value = val;
					}}
				/>
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
						<MovieList movies={this.props.movies} />
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

export default PostStoryEditor;
