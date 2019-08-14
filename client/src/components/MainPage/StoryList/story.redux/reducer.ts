import { SET_CAPTION_NEWSTORY, SET_STORIES } from './actionTypes';
import INewStory from '../INewStory';

const initialState: { stories: any; newStory: INewStory } = {
	stories: null,
	newStory: {
		image_url: null,
		caption: '123'
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
		default:
			return state;
	}
}
