export const REQUEST_FEED_NOTIFICATIONS = 'REQUEST_FEED_NOTIFICATIONS';
export const REQUEST_FEED_NOTIFICATIONS_SUCCESS =
  'REQUEST_FEED_NOTIFICATIONS_SUCCESS';
export const REQUEST_FEED_NOTIFICATIONS_FAILURE =
  'REQUEST_FEED_NOTIFICATIONS_FAILURE';
export const CHANGE_TYPE_FILTER = 'CHANGE_TYPE_FILTER';

export function requestFeedNotifications(amount) {
  return {
    type: REQUEST_FEED_NOTIFICATIONS,
    meta: amount,
  };
}
export function receiveEvents(list) {
  return {
    type: REQUEST_FEED_NOTIFICATIONS_SUCCESS,
    payload: list,
  };
}

export function filterByType(type) {
  return {
    type: CHANGE_TYPE_FILTER,
    payload: type,
  };
}
