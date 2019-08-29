import {
	ADD_STORY,
	CHANGE_ACTIVITY,
	CHANGE_IMAGE,
	RESET_NEW_STORY,
	SAVE_MOVIE,
	SET_CAPTION_NEWSTORY,
	SET_STORIES,
	SAVE_CROPPED_IMAGE,
	SET_BACKGROUNG_NEWSTORY,
	DISPLAY_PICKER,
	DISPLAY_INPUT
} from './actionTypes';
import INewStory from '../INewStory';
import replaceFilmSearch from '../../../../helpers/replaceFilmSearch';

const initialState: {
	stories: any;
	newStory: INewStory;
	cursorPosition: { start: number; end: number };
	title: string;
	photoSaved: boolean;
	isShownPicker: boolean;
	isShownInput: boolean;
} = {
	stories: null,
	newStory: {
		image_url: null,
		caption: '',
		activity: null,
		type: '',
		movieId: null,
		movieOption: '',
		backgroundColor: 'rgba(255,255,255,1)'
	},
	cursorPosition: { start: 0, end: 0 },
	title: '',
	photoSaved: false,
	isShownPicker: false,
	isShownInput: false
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
				},
				cursorPosition: {
					start: action.payload.start,
					end: action.payload.end
				},
				title: action.payload.title
			};
		case SET_BACKGROUNG_NEWSTORY:
			return {
				...state,
				newStory: {
					...state.newStory,
					backgroundColor: action.payload.color
				}
			};
		case DISPLAY_PICKER:
			return {
				...state,
				isShownPicker: action.payload.isShown
			};
		case DISPLAY_INPUT:
			return {
				...state,
				isShownInput: action.payload.isShown
			};
		case SAVE_CROPPED_IMAGE:
			return {
				...state,
				photoSaved: true
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
				},
				photoSaved: false
			};
		case ADD_STORY:
			const stories = state.stories
				? [action.payload.story, ...state.stories]
				: [action.payload.story];
			return {
				...state,
				stories
			};
		case RESET_NEW_STORY:
			return {
				...state,
				newStory: {
					...state.newStory,
					image_url: null,
					caption: '',
					activity: null,
					type: ''
				}
			};
		case SAVE_MOVIE:
			return {
				...state,
				newStory: {
					...state.newStory,
					image_url: action.payload.movie.poster_path,
					movieId: action.payload.movie.id,
					caption: replaceFilmSearch(
						state.newStory.caption || '',
						action.payload.movie.title
					),
					movieOption: action.payload.movieOption || ''
				}
			};
		default:
			return state;
	}
}
