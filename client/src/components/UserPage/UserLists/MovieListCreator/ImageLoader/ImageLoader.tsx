import React from 'react';
import { uploadFile } from '../../../../../services/file.service';
import Cropper from 'react-cropper';
import ImageUploader from '../../../../MainPage/ImageUploader/ImageUploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTimesCircle,
	faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
	setImageUrl: (image_url: string) => void;
	isIcon: boolean;
	aspectRatio?: number;
}

interface IState {
	image_url: string;
	croppedSaved: boolean;
}

class ImageLoader extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		this.state = {
			image_url: '',
			croppedSaved: false
		};
	}

	private cropper = React.createRef<Cropper>();

	imageStateHandler = (data, croppedSaved?: boolean) => {
		this.setState({
			image_url: data,
			croppedSaved: croppedSaved ? croppedSaved : this.state.croppedSaved
		});
	};

	onSaveCropped = () => {
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
	};

	onCancel = () => {
		this.setState({
			image_url: '',
			croppedSaved: false
		});
	};

	render() {
		return (
			<div className="ImageLoader">
				<div className="button-loader-container">
					<ImageUploader
						isIcon={this.props.isIcon}
						imageHandler={uploadFile}
						imageStateHandler={this.imageStateHandler}
					/>
				</div>
				{this.state.image_url && !this.state.croppedSaved && (
					<div>
						<div className="image-cropper-container">
							<Cropper
								ref={this.cropper}
								className="cropper-creator-img"
								src={this.state.image_url}
								aspectRatio={this.props.aspectRatio}
							/>
							<span onClick={this.onSaveCropped}>
								<FontAwesomeIcon
									icon={faCheckCircle}
									className="fontAwesomeIcon cropperSettingsIcon"
								/>
							</span>
							<span onClick={this.onCancel}>
								<FontAwesomeIcon
									icon={faTimesCircle}
									className={'fontAwesomeIcon cropperSettingsIcon'}
								/>
							</span>
						</div>
					</div>
				)}
				{this.state.image_url &&
					this.state.croppedSaved &&
					this.props.setImageUrl(this.state.image_url)}
			</div>
		);
	}
}

export default ImageLoader;
