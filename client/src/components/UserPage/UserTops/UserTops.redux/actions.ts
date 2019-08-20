import * as ActionTypes from './actionTypes';

export const fetchFilms = title => {
	return {
		type: ActionTypes.START_SEARCH_ELASTIC_FILMS,
		payload: {
			title
		}
	};
};

export const uploadImage = (data: FormData, topId: string) => {
	return {
		type: ActionTypes.START_UPLOAD_TOP_IMAGE,
		payload: {
			topId,
			data
		}
	};
};

export const fetchTops = (userId: string) => {
	return {
		type: ActionTypes.FETCH_TOPS,
		payload: {
			userId
		}
	};
};

export const addTop = (newTop: any) => ({
    type: ActionTypes.ADD_TOP,
    payload: {
        newTop
    }
});

export const updateTop = (updatedTop) => ({
    type: ActionTypes.UPDATE_TOP,
    payload: {
        updatedTop
    }
});

export const deleteTop = (topId: string) => {
	return {
		type: ActionTypes.DELETE_TOP,
		payload: {
			topId
		}
	};
};
