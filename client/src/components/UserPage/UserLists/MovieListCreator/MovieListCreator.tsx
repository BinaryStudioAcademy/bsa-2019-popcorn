import React, { useState } from 'react';
import './MovieListCreator.scss';
import { INewMovieList } from '../UserLists';
import { uploadFile } from '../../../../services/file.service';
import Cropper from 'react-cropper';
import ImageUploader from '../../../MainPage/ImageUploader/ImageUploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTimesCircle,
	faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import ImageLoader from './ImageLoader/ImageLoader';

interface IProps {
	saveMovieList: (movieList: INewMovieList) => void;
}

const MovieListCreator: React.FC<IProps> = () => {
	const [imageUrl, setImageUrl] = useState('');

	// const setImageUrl = (imageUrl: string) => {
	//   console.log(image_url);
	// }

	console.log(imageUrl);

	return (
		<div className="MovieListCreator">
			<ImageLoader setImageUrl={setImageUrl} />
		</div>
	);
};

export default MovieListCreator;
