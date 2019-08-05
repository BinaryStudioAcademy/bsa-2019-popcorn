import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./rootReducer";
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    sagaMiddleware,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

export default store;

sagaMiddleware.run(rootSaga);