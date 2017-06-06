import { takeLatest, put, call } from 'redux-saga/effects';

import {
  REQUEST_FEED_NOTIFICATIONS_SUCCESS,
  REQUEST_FEED_NOTIFICATIONS,
  REQUEST_FEED_NOTIFICATIONS_FAILURE,
} from 'actions/feedActions';
import moreNotificationsCall from 'api/feedApiCall';

export function* getFeedNotificationsFlow(action) {
  const receivedNotificationTypes = {
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
        type:
          receivedNotificationTypes[
            responseNotification.attributes.eventType.toLowerCase()
          ],
        targetDeck: responseNotification.attributes.deckName,
        concernedUser: responseNotification.attributes.userName,
      }),
    );

    yield put({
      type: REQUEST_FEED_NOTIFICATIONS_SUCCESS,
      payload: {
        listOfNotifications,
      },
    });
  } catch (error) {
    yield put({
      type: REQUEST_FEED_NOTIFICATIONS_FAILURE,
      payload: {
        message: error.message,
      },
    });
  }
}

function* feedUpdateWatcher() {
  yield takeLatest(REQUEST_FEED_NOTIFICATIONS, getFeedNotificationsFlow);
}

export default feedUpdateWatcher;
