require('dotenv').config();

const config = {
	API_URL: process.env.REACT_APP_API_URL,
	DEFAULT_AVATAR: '/images/default/avatar-default.png',
	DEFAULT_EVENT_IMAGE: '/images/default/event-default.png',
	DEFAULT_MOVIE_IMAGE: '/images/default/movie-default.png',
	DEFAULT_TOP_IMAGE:
		'https://www.goldderby.com/wp-content/uploads/2017/12/Oscar-statuette-trophy-atmo.png',
	DEFAULT_MOVIELIST_IMAGE: '/images/default/movielist-default.png',
	POSTER_PATH: 'https://image.tmdb.org/t/p/w500',
	DEFAULT_SURVEY_IMAGE: '/images/default/survey-default.png',
	DEFAULT_CREW_CAST_IMAGE: '/images/default/crew-cast-default.png'
};
const firebaseConfig = {
	apiKey: 'AIzaSyDBZq6hgJwMbJEi3u6GSTRi4QFphjnl32Q',
	authDomain: 'popcorn-64a9a.firebaseapp.com',
	databaseURL: 'https://popcorn-64a9a.firebaseio.com',
	projectId: 'popcorn-64a9a',
	storageBucket: '',
	messagingSenderId: '1087618889886',
	appId: '1:1087618889886:web:8e958466df264490'
};
export default config;
export { firebaseConfig };
