import { fetchTest } from './../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as testService from './TestComponent.service';
import { ADD_TEST } from './TestComponent.actionTypes';

export function* getTest() {
    try {
        yield put(fetchTest.request());
        const response = yield call(testService.getAll);

        yield put(fetchTest.success(response));
    } catch (error) {
        yield put(fetchTest.failure(error.message));
    } finally {
        yield put(fetchTest.fulfill());
    }
}

function* watchGetTest() {
    yield takeEvery(fetchTest.TRIGGER, getTest)
}

export function* addTest(action) {
    try {
        yield call(testService.addTest, action.payload);
        yield put(fetchTest());
    } catch (error) {
        console.log(error);
    }
}

function* watchAddTest() {
    yield takeEvery(ADD_TEST, addTest)
}


export default function* messagesSaga() {
    yield all([
        watchGetTest(),
        watchAddTest(),
    ])
};
