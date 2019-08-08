import { combineReducers } from "redux";
import headerReducer from '../components/shared/Header/Header.reducer';

const reducers = {
    
};

export default combineReducers({
    ...reducers,
    header: headerReducer
})