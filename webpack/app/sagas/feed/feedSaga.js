import { takeLatest, put, call } from 'redux-saga/effects';

import { types } from 'actions/feedActions';
import feedApiCall from 'api/feedApiCall';

export function* getFeedFlow() {
  const receivedElementTypes = {
    deck_created: 'DECK_CREATED',
    deck_updated: 'DECK_UPDATED',
  };

  try {
    const responseListOfNotifications = yield call(feedApiCall);
    if (!responseListOfNotifications) {
      throw new Error('Received undefined list.');
    }

    const listOfNotifications = responseListOfNotifications.map(responseNotification => ({
      timestamp: responseNotification.attributes.createdAt,
      type: receivedElementTypes[responseNotification.attributes.eventType.toLowerCase()],
      targetDeck: responseNotification.attributes.deckName,
      concernedUser: responseNotification.attributes.userName,
    }));

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
