import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { ADD_SLIDE, DELETE_SLIDE } from 'actions/entities/slides';
import { FETCH_DECK_SUCCESS, ADD_DECK_METADATA } from 'actions/entities/decks';

const initialState = Immutable({});

function addSlide(state, action) {
  const deck = state[action.payload.deckId];
  return state.merge({
    [deck.id]: {
      slideIds: deck.slideIds.concat(action.payload.slideId),
      slideSequence: deck.slideSequence + 1,
    },
  }, { deep: true });
}

function deleteSlide(state, action) {
  const deck = state[action.payload.deckId];

  return state.merge({
    [deck.id]: {
      slideIds: _.without(deck.slideIds, action.payload.slideId),
    },
  }, { deep: true });
}

function fetchDeckSuccess(state, action) {
  const deckId = action.payload.deckId;
  return state.merge({
    [deckId]: {
      id: deckId,
      meta: action.payload.metadata,
      slideIds: Object.keys(action.payload.slidesById),
      slideSequence: Object.keys(action.payload.slidesById).length,
    },
  });
}

function addDeckMetadata(state, action) {
  const deckId = action.payload.id;
  const metadata = action.payload.metadata;
  return state.merge({
    [deckId]: {
      meta: metadata,
    },
  });
}

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_SLIDE: return addSlide(state, action);
    case DELETE_SLIDE: return deleteSlide(state, action);
    case FETCH_DECK_SUCCESS: return fetchDeckSuccess(state, action);
    case ADD_DECK_METADATA: return addDeckMetadata(state, action);
    default: return state;
  }
}

export default byId;
