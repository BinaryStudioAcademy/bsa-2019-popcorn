import {
	START_SEARCH_ELASTIC_FILMS,
	START_UPLOAD_TOP_IMAGE
} from './actionTypes';

export const fetchFilms = title => {
	return {
		type: START_SEARCH_ELASTIC_FILMS,
		payload: {
			title
		}
	};
};

export const uploadImage = (data: FormData, topId: string) => {
	return {
		type: START_UPLOAD_TOP_IMAGE,
		payload: {
			topId,
			data
		}
	};
};
