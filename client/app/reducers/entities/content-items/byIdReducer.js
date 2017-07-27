import _ from 'lodash';
import Immutable from 'seamless-immutable';

import {
  ADD_CONTENT_ITEM,
  UPDATE_CONTENT_ITEM,
  DELETE_CONTENT_ITEM,
} from 'actions/entities/content-items';
import { DELETE_SLIDE } from 'actions/entities/slides';
import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';

const initialState = Immutable({});

function addContentItem(state, action) {
  const contentItemId = action.payload.contentItemId;
  let newState = state;

  // If there is a parent contentItem, add the new contentItem's id to its
  // childItemsIds array.
  if (action.payload.parentItemId !== null) {
    const parentItem = state[action.payload.parentItemId];
    const childItemIds = parentItem.childItemIds.asMutable();
    const afterItemId = action.payload.afterItemId;
    const addAtIndex = (afterItemId !== null)
      ? Array.indexOf(childItemIds, afterItemId) + 1
      : childItemIds.length;

    childItemIds.splice(addAtIndex, 0, contentItemId);

    newState = newState.merge({
      [parentItem.id]: {
        childItemIds,
      },
    }, { deep: true });
  }

  return newState.merge({
    [contentItemId]: {
      id: contentItemId,
      contentItemType: action.payload.contentItemType,
      ...action.payload.props,
    },
  });
}

function updateContentItem(state, action) {
  const contentItem = state[action.payload.contentItemId];

  return state.merge({
    [contentItem.id]: action.payload.props,
  }, { deep: true });
}

function deleteContentItem(state, action) {
  const contentItem = state[action.payload.contentItemId];
  let newState = state;

  // Remove the deleted content item from the byId object.
  newState = newState.without(contentItem.id);

  // If there are descendant items, remove these from the byId object as well.
  if (action.payload.descendantItemIds.length !== 0) {
    newState = newState.without(action.payload.descendantItemIds);
  }

  // If there is a parent item, remove the deleted contentItem's id from its
  // childItemIds array.
  if (action.payload.parentItemId !== null) {
    const parentItem = state[action.payload.parentItemId];
    newState = newState.merge({
      [parentItem.id]: {
        childItemIds: _.without(parentItem.childItemIds, contentItem.id),
      },
    }, { deep: true });
  }

  return newState;
}

function deleteSlide(state, action) {
  return state.without(action.payload.contentItemIds);
}

function fetchDeckSuccess(state, action) {
  return state.merge({
    ...action.payload.contentItemsById,
  });
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
