import { SET_STORIES } from './actionTypes';
import INewStory from '../INewStory';

const initialState: { stories: any; newStory: INewStory } = {
	stories: null,
	newStory: {
		image_url: null,
		userId: null,
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
		default:
			return state;
	}
}
