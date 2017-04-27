import { takeLatest, put } from 'redux-saga/effects';

import { types } from 'actions/feedActions';
import feedApiCall from './feedApiCall';

export function* getFeedFlow() {
  try {
    const listOfNotifications = feedApiCall();

    yield put({
      type: types.RECEIVED_LIST,
      payload: {
        listOfNotifications,
      },
    });
  } catch (error) {
    yield put({
      type: types.RECEPTION_ERROR,
      payload: {
        message: error.message,
        statusCode: error.statusCode,
      },
    });
  }
}

function* feedUpdateWatcher() {
  yield takeLatest(types.REQUEST_FEED_ELEMENTS, getFeedFlow);
}

export default feedUpdateWatcher;
