import { all } from 'redux-saga/effects';
import headerSaga from '../components/shared/Header/saga';
import profileSaga from '../components/UserPage/saga';

export default function* rootSaga() {
    yield all([
        headerSaga(),
        profileSaga()
    ])
};