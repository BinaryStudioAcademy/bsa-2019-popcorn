import { fetchUser } from '../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as settingService from './../../services/settings.service';
import {
	UPDATE_NOTIFICATION_SETTINGS,
	UPDATE_PRIVACY,
	UPDATE_USER_EMAIL,
	UPDATE_USER_PASSWORD,
	DELETE_USER
} from './actionTypes';

export function* getUser() {
	try {
		yield put(fetchUser.request());
		const response = yield call(settingService.getUser);

		yield put(fetchUser.success(response));
	} catch (error) {
		yield put(fetchUser.failure(error.message));
	} finally {
		yield put(fetchUser.fulfill());
	}
}

function* watchGetUser() {
	yield takeEvery(fetchUser.TRIGGER, getUser);
}

export function* updateEmail(action) {
	try {
		const { userId, email } = action.payload;
		yield call(settingService.updateEmail, userId, email);
		yield put(fetchUser());
	} catch (error) {
		console.log(error);
	}
}

function* watchUpdateEmail() {
	yield takeEvery(UPDATE_USER_EMAIL, updateEmail);
}

export function* updatePassword(action) {
	try {
		const { userId, password } = action.payload;
		yield call(settingService.updatePassword, userId, password);
		yield put(fetchUser());
	} catch (error) {
		console.log(error);
	}
}

function* watchUpdatePassword() {
	yield takeEvery(UPDATE_USER_PASSWORD, updatePassword);
}

export function* updateNotificationSettings(action) {
	try {
		const { userId, data } = action.payload;
		yield call(settingService.updateNotificationSettings, userId, data);
		yield put(fetchUser());
	} catch (error) {
		console.log(error);
	}
}

function* watchNotificationSettings() {
	yield takeEvery(UPDATE_NOTIFICATION_SETTINGS, updateNotificationSettings);
}

export function* updatePrivacySettings(action) {
	try {
		const { userId, data } = action.payload;
		yield call(settingService.updatePrivacySettings, userId, data);
		yield put(fetchUser());
	} catch (error) {
		console.log(error);
	}
}

function* watchPrivacySettings() {
	yield takeEvery(UPDATE_PRIVACY, updatePrivacySettings);
}

export function* deleteUser(action) {
	try {
		const { userId } = action.payload;
		yield call(settingService.deleteUser, userId);
		yield put(fetchUser());
	} catch (error) {
		console.log(error);
	}
}

function* watchDeleteUser() {
	yield takeEvery(DELETE_USER, deleteUser);
}

export default function* messagesSaga() {
	yield all([
		watchGetUser(),
		watchUpdateEmail(),
		watchUpdatePassword(),
		watchNotificationSettings(),
		watchPrivacySettings(),
		watchDeleteUser()
	]);
}
