export const types = {
  REQUEST_FEED_ELEMENTS: 'REQUEST_FEED_ELEMENTS',
  RECEIVED_LIST: 'RECEIVED_LIST',
  RECEPTION_ERROR: 'RECEPTION_ERROR',
};

export default function requestEvents() {
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
