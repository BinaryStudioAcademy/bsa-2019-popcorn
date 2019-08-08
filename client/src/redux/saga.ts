import { all } from 'redux-saga/effects';
import testSaga from '../components/TestComponent/TestComponent.sagas';
import headerSaga from '../components/Header/saga';

export default function* rootSaga() {
    yield all([
        testSaga(),
        headerSaga()
    ])
};