import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { ADD_CONTENT_ITEM, UPDATE_CONTENT_ITEM, DELETE_CONTENT_ITEM } from 'actions/entities/content-items';
import { DELETE_SLIDE } from 'actions/entities/slides';
import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';

const initialState = Immutable({});

function addContentItem(state, action) {
  const contentItemId = action.payload.contentItemId;

  // If there is a parent contentItem, add the new contentItem's id to its childItemsIds array.
  if (action.payload.parentItemId !== null) {
    const parentItem = state[action.payload.parentItemId];
    state = Immutable.merge(
      state,
      {
        [parentItem.id]: {
          childItemIds: parentItem.childItemIds.concat(contentItemId),
        },
      },
      { deep: true },
    );
  }

  return Immutable.merge(state,
    {
      [contentItemId]: {
        id: contentItemId,
        contentItemType: action.payload.contentItemType,
        ...action.payload.props,
      },
    }
  );
}

function updateContentItem(state, action) {
  const contentItem = state[action.payload.contentItemId];

  return Immutable.merge(
    state,
    {
      [contentItem.id]: action.payload.props,
    },
    { deep: true },
  );
}

function deleteContentItem(state, action) {
  const contentItem = state[action.payload.contentItemId];

  // Remove the deleted content item from the byId object.
  state = _.omit(contentItem.id);

  // If there are descendant items, remove these from the byId object as well.
  if (action.payload.descendantItemIds.length !== 0) {
    state = _.omit(state, action.payload.descendantItemIds);
  }

  // If there is a parent item, remove the deleted contentItem's id from its childItemIds array.
  if (action.payload.parentItemId !== null) {
    const parentItem = state[action.payload.parentItemId];
    state = Immutable.merge(
      state,
      {
        [parentItem.id]: {
          childItemIds: _.without(parentItem.childItemIds, contentItem.id),
        },
      },
      { deep: true },
    );
  }

  return state;
}

function deleteSlide(state, action) {
  return _.omit(state, action.payload.contentItemIds);
}

function fetchDeckSuccess(state, action) {
  return Immutable.merge(
    state,
    {
      ...action.payload.contentItemsById,
    },
  );
}

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTENT_ITEM: return addContentItem(state, action);
    case UPDATE_CONTENT_ITEM: return updateContentItem(state, action);
    case DELETE_CONTENT_ITEM: return deleteContentItem(state, action);
    case DELETE_SLIDE: return deleteSlide(state, action);
    case FETCH_DECK_SUCCESS: return fetchDeckSuccess(state, action);
    default: return state;
  }
}

export default byId;
