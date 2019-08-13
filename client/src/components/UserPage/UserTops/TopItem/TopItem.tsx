import React, { useState, useEffect } from 'react';
import './TopItem.scss';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/general/closeIcon.svg';
import TopConstructor from './TopConstructor/TopConstructor';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export interface ITopItem {
	title: string;
	id: string;
	moviesList: IMovie[];
	topImageUrl: string;
}

export interface IMovie {
	//if needed could be changed
	id: string;
	title: string;
	comment: string;
}

interface ITopItemProps {
	topItem: ITopItem;
	deleteTop: (topId: string) => void;
	saveUserTop: (topItem: ITopItem) => void;
	uploadImage: (data: any, titleId: string) => void;
	uploadUrl: string;
	urlForTop: string;
}

const TopItem: React.FC<ITopItemProps> = ({
	saveUserTop,
	topItem,
	deleteTop,
	uploadImage,
	uploadUrl,
	urlForTop
}) => {
	const [editTop, canEditTop] = useState(false);
	const [title, setTitle] = useState(topItem.title);
	const [topImageUrl, setTopImageUrl] = useState('');
	useEffect(() => {
		if (urlForTop == topItem.id) {
			setTopImageUrl(uploadUrl);
			saveUserTop({ ...topItem, title, topImageUrl });
		}
	}, [uploadUrl]);

	function toogleEdit() {
		canEditTop(!editTop);
	}

	function saveTop(movies: Array<any>) {
		const moviesList = movies.filter(movie => movie.title.trim() !== '');
		saveUserTop({ ...topItem, moviesList, title, topImageUrl });
		canEditTop(false);
	}

	function handleUploadFile(e, topId: string) {
		const data = new FormData();
		data.append('file', e.target.files[0]);
		if (uploadImage) uploadImage(data, topId);
		else console.log('no uploadImage method');
	}

	return (
		<div>
			<div className="top-item">
				{editTop || topItem.moviesList.length === 0 ? (
					<input
						maxLength={140}
						placeholder="Top name"
						className="top-title-input"
						onChange={e => setTitle(e.target.value)}
						value={title}
					/>
				) : (
					<div className="top-item-title">{title}</div>
				)}
				<input
					name="image"
					type="file"
					onChange={e => handleUploadFile(e, topItem.id)}
					id={`${topItem.id}image`}
					accept=".jpg, .jpeg, .png"
					hidden
				/>
				<label
					htmlFor={`${topItem.id}image`}
					className="top-upload-image hover"
				>
					<FontAwesomeIcon icon={faImage} className="fontAwesomeIcon" />
				</label>

				<div className="edit-top hover" onClick={toogleEdit}>
					Edit
				</div>
				<div className="delete-top hover" onClick={() => deleteTop(topItem.id)}>
					<CloseIcon />
				</div>

				<img className="image-top" src={topImageUrl} alt="" />
			</div>
			{(editTop || topItem.moviesList.length === 0) && (
				<TopConstructor moviesList={topItem.moviesList} saveTop={saveTop} />
			)}
		</div>
	);
};

export default TopItem;
