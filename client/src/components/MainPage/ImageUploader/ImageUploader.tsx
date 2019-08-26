import React from 'react';
import './ImageUploader.scss';
import config from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

interface IPostImageUploaderProps {
	imageHandler: (s: any) => any;
	imageStateHandler: (s: any) => any;
	isIcon?: boolean;
}

interface IPostImageUploaderState {
	imageUrl?: string;
	errorMsg?: string;
	isUploading: boolean;
}

class ImageUploader extends React.Component<
	IPostImageUploaderProps,
	IPostImageUploaderState
> {
	constructor(props: IPostImageUploaderProps) {
		super(props);
		this.state = {
			imageUrl: undefined,
			errorMsg: '',
			isUploading: false
		};

		this.handleUploadFile = this.handleUploadFile.bind(this);
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

		if (this.props.imageHandler)
			this.props
				.imageHandler(data)
				.then(({ imageUrl }) => {
					let url;
					url =
						imageUrl.indexOf('\\') !== -1
							? imageUrl.split(`\\`)
							: imageUrl.split(`/`);
					url.shift();
					url = url.join('/');

					url = '/' + url;
					const splittedUrl = imageUrl.split('.');
					if (
						!(
							splittedUrl[splittedUrl.length - 1] === 'jpeg' ||
							splittedUrl[splittedUrl.length - 1] === 'jpg' ||
							splittedUrl[splittedUrl.length - 1] === 'png'
						)
					) {
						throw new Error('Incorrect image format');
					}
					this.setState({ imageUrl: url, isUploading: false, errorMsg: '' });
					this.props.imageStateHandler(url);
				})
				.catch(error => {
					this.setState({ isUploading: false, errorMsg: error.message });
				});
		target.value = '';
	}

	render() {
		return (
			<div>
				{this.state.errorMsg && (
					<span className="upload-error">{this.state.errorMsg}</span>
				)}
				<input
					name="image"
					type="file"
					onChange={this.handleUploadFile}
					className="upload-image"
					id="image"
					accept=".jpg, .jpeg, .png"
					disabled={this.state.isUploading}
				/>
				{this.props.children ? (
					this.props.children
				) : this.props.isIcon ? (
					<label htmlFor="image" className="upload-image-button">
						<FontAwesomeIcon icon={faCamera} />
					</label>
				) : (
					<label htmlFor="image" className="upload-image-button">
						Upload image
					</label>
				)}
			</div>
		);
	}
}

export default ImageUploader;
