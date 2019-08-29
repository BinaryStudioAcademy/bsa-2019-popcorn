import {
	ADD_STORY,
	CHANGE_ACTIVITY,
	CHANGE_IMAGE,
	CREATE_STORY,
	CREATE_VOTING,
	FETCH_STORIES,
	SAVE_MOVIE,
	SET_CAPTION_NEWSTORY,
	SET_BACKGROUNG_NEWSTORY,
	SET_FONTCOLOR_NEWSTORY,
	SAVE_CROPPED_IMAGE,
	DISPLAY_PICKER,
	DISPLAY_FONT_PICKER,
	DISPLAY_INPUT,
	SET_TEXT_POSITION_NEWSTORY
} from './actionTypes';
import INewStory from '../INewStory';
import IVoting from '../IVoting';
import TMovie from '../../../MovieSeriesPage/TMovie';

export const fetchStories = () => {
	return {
		type: FETCH_STORIES
	};
};

export const setCaption = (caption, start, end, title) => {
	return {
		type: SET_CAPTION_NEWSTORY,
		payload: {
			caption,
			start,
			end,
			title
		}
	};
};

export const setBackground = color => {
	return {
		type: SET_BACKGROUNG_NEWSTORY,
		payload: {
			color
		}
	};
};

export const setFontColor = color => {
	return {
		type: SET_FONTCOLOR_NEWSTORY,
		payload: {
			color
		}
	};
};
export const setTextPosition = position => {
	return {
		type: SET_TEXT_POSITION_NEWSTORY,
		payload: {
			position
		}
	};
};

export const displayPicker = isShown => {
	return {
		type: DISPLAY_PICKER,
		payload: {
			isShown
		}
	};
};

export const displayFontPicker = isShown => {
	return {
		type: DISPLAY_FONT_PICKER,
		payload: {
			isShown
		}
	};
};

export const displayInput = isShown => {
	return {
		type: DISPLAY_INPUT,
		payload: {
			isShown
		}
	};
};

export const saveCroppedImage = status => {
	return {
		type: SAVE_CROPPED_IMAGE,
		payload: status
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
		type: CREATE_VOTING,
		payload: {
			voting
		}
	};
};

export const addStory = story => {
	return {
		type: ADD_STORY,
		payload: {
			story
		}
	};
};

export const saveMovie = (movie: TMovie, movieOption = '') => {
	return {
		type: SAVE_MOVIE,
		payload: {
			movie,
			movieOption
		}
	};
};
