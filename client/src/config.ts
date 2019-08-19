require('dotenv').config();
const config = {
	API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
	DEFAULT_AVATAR: '/images/default/avatar-default.png',
	DEFAULT_EVENT_IMAGE: '/images/default/event-default.png',
	DEFAULT_MOVIE_IMAGE: '/images/default/movie-default.png',
	POSTER_PATH: 'https://image.tmdb.org/t/p/w500'
};
export default config;
