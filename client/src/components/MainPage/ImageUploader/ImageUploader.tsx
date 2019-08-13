import React from 'react';
import './ImageUploader.scss';

interface IPostImageUploaderProps {
	imageHandler: (s: any) => any;
	imageStateHandler: (s: any) => any;
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

		this.props
			.imageHandler(data)
			.then(({ imageUrl }) => {
				this.setState({ imageUrl, isUploading: false, errorMsg: '' });
				this.props.imageStateHandler(imageUrl);
			})
			.catch(error => {
				this.setState({ isUploading: false, errorMsg: error.message });
			});
		target.value = '';
	}

	render() {
		return (
			<div className="edit-form">
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
				<label htmlFor="image" className="upload-image-button">
					Upload image
				</label>
			</div>
		);
	}
}

export default ImageUploader;
