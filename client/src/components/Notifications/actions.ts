import { ADD_STORY } from '../MainPage/StoryList/story.redux/actionTypes';

export const addStory = story => {
	return {
		type: ADD_STORY,
		payload: {
			story
		}
	};
};
