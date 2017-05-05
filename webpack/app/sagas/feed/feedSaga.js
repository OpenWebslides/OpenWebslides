import { takeLatest, put, call } from 'redux-saga/effects';

import { types } from 'actions/feedActions';
import feedApiCall from 'api/feedApiCall';

export function* getFeedFlow() {
  try {
    const listOfNotifications = yield call(feedApiCall);

    if (!listOfNotifications) {
      throw new Error('Received undefined list.');
    }

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
      },
    });
  }
}

function* feedUpdateWatcher() {
  yield takeLatest(types.REQUEST_FEED_ELEMENTS, getFeedFlow);
}

export default feedUpdateWatcher;
