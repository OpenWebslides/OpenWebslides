export const types = {
  REQUEST_FEED_ELEMENTS: 'REQUEST_FEED_ELEMENTS',
  RECEIVED_LIST: 'RECEIVED_LIST',
  RECEPTION_ERROR: 'RECEPTION_ERROR',
  CHANGE_TYPE_FILTER: 'CHANGE_TYPE_FILTER',
};

export function requestEvents() {
  return {
    type: types.REQUEST_FEED_ELEMENTS,
  };
}

export function receiveEvents(list) {
  return {
    type: types.RECEIVED_LIST,
    payLoad: list,
  };
}

export function filterByType(type) {
  return {
    type: types.CHANGE_TYPE_FILTER,
    payLoad: type,
  };
}
