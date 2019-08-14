import {
	CHANGE_ACTIVITY,
	CHANGE_IMAGE,
	CREATE_STORY,
	FETCH_STORIES,
	SET_CAPTION_NEWSTORY
} from './actionTypes';
import INewStory from '../INewStory';
import IVoting from '../IVoting';

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

export const saveImage = url => {
	return {
		type: CHANGE_IMAGE,
		payload: url
	};
};

export const changeActivity = (
	type: string,
	activity: { id: string; name: string }
) => {
	return {
		type: CHANGE_ACTIVITY,
		payload: {
			type,
			activity
		}
	};
};

export const createStory = (newStory: INewStory, userId: string) => {
	return {
		type: CREATE_STORY,
		payload: {
			newStory,
			userId
		}
	};
};

export const createVoting = (voting: IVoting) => {
	return {
		type: CREATE_STORY,
		payload: {
			voting
		}
	};
};
