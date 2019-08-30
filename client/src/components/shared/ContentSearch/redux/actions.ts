import {
	CONTENT_SEARCH_FETCH_ALL,
	CONTENT_SEARCH_FETCH_EVENT,
	CONTENT_SEARCH_FETCH_MOVIE,
	CONTENT_SEARCH_FETCH_SURVEY,
	CONTENT_SEARCH_FETCH_TOP
} from './actionTypes';

export const fetchAll = title => ({
	type: CONTENT_SEARCH_FETCH_ALL,
	payload: { title }
});

export const fetchMovie = title => ({
	type: CONTENT_SEARCH_FETCH_MOVIE,
	payload: { title }
});

export const fetchTop = title => ({
	type: CONTENT_SEARCH_FETCH_TOP,
	payload: { title }
});

export const fetchEvent = title => ({
	type: CONTENT_SEARCH_FETCH_EVENT,
	payload: { title }
});

export const fetchSurvey = title => ({
	type: CONTENT_SEARCH_FETCH_SURVEY,
	payload: { title }
});
