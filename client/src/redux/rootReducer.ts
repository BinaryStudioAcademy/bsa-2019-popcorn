import { combineReducers } from "redux";
import movieReducer from '../components/MovieSeriesPage/Movie.redux/reducer';
import profileHeader from '../components/UserPage/reducer';

const reducers = {
    
};

export default combineReducers({
    ...reducers,
    movie: movieReducer,
    profile:profileHeader
});