import {
	ADD_STORY,
	CHANGE_ACTIVITY,
	CHANGE_IMAGE,
	DELETE_NEW_STORY,
	SET_CAPTION_NEWSTORY,
	SET_STORIES
} from './actionTypes';
import INewStory from '../INewStory';

const initialState: { stories: any; newStory: INewStory } = {
	stories: null,
	newStory: {
		image_url: null,
		caption: '',
		activity: null,
		type: ''
	}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_STORIES:
			return {
				...state,
				stories: action.payload.stories
			};
		case SET_CAPTION_NEWSTORY:
			return {
				...state,
				newStory: {
					...state.newStory,
					caption: action.payload.caption
				}
			};
		case CHANGE_IMAGE:
			return {
				...state,
				newStory: {
					...state.newStory,
					image_url: action.payload
				}
			};
		case CHANGE_ACTIVITY:
			return {
				...state,
				newStory: {
					...state.newStory,
					type: action.payload.type,
					activity: action.payload.activity
				}
			};
		case ADD_STORY:
			const stories = state.stories
				? [action.payload.story, ...state.stories]
				: [action.payload.story];
			return {
				...state,
				stories
			};
		case DELETE_NEW_STORY:
			return {
				...state,
				newStory: {
					image_url: null,
					caption: '',
					activity: null,
					type: ''
				}
			};
		default:
			return state;
	}
}
