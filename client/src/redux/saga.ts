import { all } from 'redux-saga/effects';
import headerSaga from '../components/shared/Header/saga';

export default function* rootSaga() {
    yield all([
        headerSaga()
    ])
};