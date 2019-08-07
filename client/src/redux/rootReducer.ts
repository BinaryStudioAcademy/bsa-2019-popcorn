import { combineReducers } from "redux";
import testReducer from "./../components/TestComponent/TestComponent.reducer";

const reducers = {
    test: testReducer,
};

export default combineReducers({
    ...reducers
})