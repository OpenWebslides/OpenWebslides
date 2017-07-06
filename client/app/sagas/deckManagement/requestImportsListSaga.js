import { takeLatest, put, call } from 'redux-saga/effects';

import {
  REQUEST_USER_IMPORTS_SUCCESS,
  REQUEST_USER_IMPORTS,
  REQUEST_USER_IMPORTS_FAILURE,
} from 'actions/userImportsActions';
import getUserImportsCall from 'api/getUserImportsApi';

export function* getUserImportsFlow(action) {
  try {
    const userID = action.meta;
    const responseListOfImports = yield call(getUserImportsCall, userID);
    if (!responseListOfImports) {
      throw new Error('Received undefined list.');
    }
    const listOfImports = responseListOfImports.map(responseImport => ({
      id: responseImport.id,
      timeStamp: responseImport.timeStamp,
      status: responseImport.status,
      type: 'pptx',
      name: responseImport.name,
    }));

    yield put({
      type: REQUEST_USER_IMPORTS_SUCCESS,
      payload: {
        listOfImports,
      },
    });
  } catch (error) {
    yield put({
      type: REQUEST_USER_IMPORTS_FAILURE,
      payload: {
        message: error.message,
      },
    });
  }
}

function* importsRequestWatcher() {
  yield takeLatest(REQUEST_USER_IMPORTS, getUserImportsFlow);
}

export default importsRequestWatcher;
