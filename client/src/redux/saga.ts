import { all } from 'redux-saga/effects';
import testSaga from '../components/TestComponent/TestComponent.sagas';

export default function* rootSaga() {
    yield all([
        testSaga(),
    ])
};