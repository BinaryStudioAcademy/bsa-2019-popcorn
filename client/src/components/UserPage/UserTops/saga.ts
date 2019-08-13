import { all, call, put, takeEvery } from 'redux-saga/effects';
import { START_UPLOAD_TOP_IMAGE, SET_TOP_IMAGE } from './actionTypes';
import { uploadFile } from '../../../services/file.service';
import axios from 'axios';

import config from '../../../config';

export function* uploadImage(action) {
	try {
		const data = yield call(uploadFile, action.payload.data);
		let url = data.imageUrl.split(`\\`);
		url.shift();

		yield put({
			type: SET_TOP_IMAGE,
			payload: {
				uploadUrl: config.API_URL + '/' + url.join('/'),
				topId: action.payload.topId
			}
		});
	} catch (e) {
		console.log('user page saga catch: uploadAvatar', e.message);
	}
}

function* watchUploadImage() {
	yield takeEvery(START_UPLOAD_TOP_IMAGE, uploadImage);
}

export default function* profile() {
	yield all([watchUploadImage()]);
}
