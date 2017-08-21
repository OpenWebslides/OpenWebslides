import { takeLatest, put, call } from 'redux-saga/effects';

import {
  REQUEST_FEED_NOTIFICATIONS_SUCCESS,
  REQUEST_FEED_NOTIFICATIONS,
  REQUEST_FEED_NOTIFICATIONS_FAILURE,
} from 'actions/feedActions';
import moreNotificationsCall from 'api/feedApiCall';

export function* getFeedNotificationsFlow(action) {
  const receivedNotificationTypes = {
    deck_created: 'deck_created',
    deck_updated: 'deck_updated',
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
        id: responseNotification.id,
        timestamp: responseNotification.meta.createdAt,
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
