import { takeLatest, put, call } from 'redux-saga/effects';

import {
  REQUEST_FEED_NOTIFICATIONS_SUCCESS,
  REQUEST_FEED_NOTIFICATIONS,
  REQUEST_FEED_NOTIFICATIONS_FAILURE,
} from 'actions/feedActions';
import { SIGNOUT } from 'actions/signoutActions';

import moreNotificationsCall from 'api/feedApiCall';

function notificationJsonToObject(notification) {
  const receivedNotificationTypes = {
    deck_created: 'deck_created',
    deck_updated: 'deck_updated',
  };

  return {
    id: notification.id,
    timestamp: notification.meta.createdAt,
    type:
      receivedNotificationTypes[
        notification.attributes.eventType.toLowerCase()
        ],
    targetDeck: notification.attributes.deckName,
    targetDeckId: notification.relationships.deck.data.id,
    concernedUser: notification.attributes.userName,
    concernedUserId: notification.relationships.user.data.id,
  };
}


export function* getFeedNotificationsFlow(action) {
  try {
    const responseListOfNotifications = yield call(
      moreNotificationsCall,
      action.meta,
    );
    if (!responseListOfNotifications) {
      throw new Error('Received undefined list.');
    }
    const listOfNotifications = responseListOfNotifications.map(notificationJsonToObject);

    yield put({
      type: REQUEST_FEED_NOTIFICATIONS_SUCCESS,
      payload: {
        listOfNotifications,
      },
    });
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put({
        type: REQUEST_FEED_NOTIFICATIONS_FAILURE,
        payload: {
          message: 'You are not signed in!',
        },
      });
    }
    else {
      yield put({
        type: REQUEST_FEED_NOTIFICATIONS_FAILURE,
        payload: {
          message: error.message,
        },
      });
    }
  }
}

function* feedUpdateWatcher() {
  yield takeLatest(REQUEST_FEED_NOTIFICATIONS, getFeedNotificationsFlow);
}

export default feedUpdateWatcher;
