import { FETCH_STORIES, SET_CAPTION_NEWSTORY } from './actionTypes';

export const fetchStories = () => {
	return {
		type: FETCH_STORIES
	};
};

export const setCaption = caption => {
	return {
		type: SET_CAPTION_NEWSTORY,
		payload: {
			caption
		}
	};
};
