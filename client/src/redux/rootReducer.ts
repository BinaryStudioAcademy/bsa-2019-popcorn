import { combineReducers } from "redux";
import headerReducer from '../components/shared/Header/Header.reducer';
import profileHeader from '../components/UserPage/reducer';

const reducers = {
    
};

export default combineReducers({
    ...reducers,
    header: headerReducer,
    profile:profileHeader
});