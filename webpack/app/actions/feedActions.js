export const types = {
  REQUEST_FEED_ELEMENTS: 'REQUEST_FEED_ELEMENTS',
  RECEIVED_LIST: 'RECEIVED_LIST',
  RECEPTION_ERROR: 'RECEPTION_ERROR',
  CHANGE_TYPE_FILTER: 'CHANGE_TYPE_FILTER',
  REQUEST_MORE_NOTIFICATIONS: 'REQUEST_MORE_NOTIFICATIONS',
  RECEIVED_MORE_NOTIFICATIONS: 'RECEIVED_MORE_NOTIFICATIONS',
};

export function requestEvents() {
  return {
    type: types.REQUEST_FEED_ELEMENTS,
  };
}
export function requestMore(amount) {
  return {
    type: types.REQUEST_MORE_NOTIFICATIONS,
    meta: amount,
  };
}
export function receiveEvents(list) {
  return {
    type: types.RECEIVED_LIST,
    payload: list,
  };
}

export function filterByType(type) {
  return {
    type: types.CHANGE_TYPE_FILTER,
    payload: type,
  };
}
