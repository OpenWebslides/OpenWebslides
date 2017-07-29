import { takeLatest, call, put, select } from 'redux-saga/effects';

import uploadAssetApi from 'api/uploadAssetApi';
import { getActiveDeckId } from 'selectors/app/slide-editor';

import { UPLOAD_ASSETS, UPLOAD_ASSETS_SUCCESS, UPLOAD_ASSETS_FAILURE } from 'actions/other/assetActions';

export function* doUploadAsset(action) {
  try {
    const activeDeckId = yield select(getActiveDeckId);
    console.log(activeDeckId);
    const { files } = action.meta;
    console.log(files);

    for (let i = 0; i < files.length; i += 1) {
      yield call(uploadAssetApi, activeDeckId, files[i]);
    }
    console.log('finished');
    // yield put({ type: UPLOAD_ASSETS_SUCCESS });
  }
  catch (error) {
    // yield put({ type: UPLOAD_ASSETS_FAILURE });
  }
}

function* uploadAssetWatcher() {
  yield takeLatest(UPLOAD_ASSETS, doUploadAsset);
}

export default uploadAssetWatcher;
