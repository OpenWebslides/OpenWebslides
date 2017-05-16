import { takeLatest, put, call } from 'redux-saga/effects';

import { types } from 'actions/feedActions';
import moreNotificationsCall from 'api/moreNotificationsCall';

export function* getMoreNotificationsFlow(action) {
  const receivedElementTypes = {
    deck_created: 'DECK_CREATED',
    deck_updated: 'DECK_UPDATED',
  };

  try {
    const responseListOfNotifications = yield call(
      moreNotificationsCall,
      action.meta,
    );

    if (!responseListOfNotifications) {
      throw new Error('Received undefined list.');
    }

    const listOfNotifications = responseListOfNotifications.map(
      responseNotification => ({
        timestamp: responseNotification.attributes.createdAt,
        type: receivedElementTypes[
          responseNotification.attributes.eventType.toLowerCase()
        ],
        targetDeck: responseNotification.attributes.deckName,
        concernedUser: responseNotification.attributes.userName,
      }),
    );

    debugger;
    yield put({
      type: types.RECEIVED_MORE_NOTIFICATIONS,
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
  yield takeLatest(types.REQUEST_MORE_NOTIFICATIONS, getMoreNotificationsFlow);
}

export default feedUpdateWatcher;
