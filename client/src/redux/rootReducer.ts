import { combineReducers } from "redux";
import testReducer from "./../components/TestComponent/TestComponent.reducer";
import headerReducer from '../components/Header/Header.reducer';

const reducers = {
    test: testReducer,
};

export default combineReducers({
    ...reducers,
    header: headerReducer
})