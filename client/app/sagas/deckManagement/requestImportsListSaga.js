import { takeLatest, put, call } from 'redux-saga/effects';

import {
  REQUEST_USER_IMPORTS_SUCCESS,
  REQUEST_USER_IMPORTS,
  REQUEST_USER_IMPORTS_FAILURE,
} from 'actions/userImportsActions';
import getUserImportsCall from 'api/getUserImportsApi';

export function computeType(name) {
  if (name.match(/\.pptx$/)) {
    return 'pptx';
  } else if (name.match(/\.pdf$/)) {
    return 'pdf';
  }
  return 'unknown';
}

export function* getUserImportsFlow(action) {
  try {
    const userID = action.meta;
    const responseListOfImports = yield call(getUserImportsCall, userID);
    if (!responseListOfImports) {
      throw new Error('Received undefined list.');
    }
    const listOfImports = responseListOfImports.map(responseImport => ({
      id: responseImport.id,
      timestamp: responseImport.meta.createdAt,
      status: responseImport.attributes.status,
      type: computeType(responseImport.attributes.name),
      name: responseImport.attributes.name,
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
