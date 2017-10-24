import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { ADD_SLIDE, DELETE_SLIDE } from 'actions/entities/slides';
import { FETCH_DECK_SUCCESS, ADD_DECK_METADATA, DELETE_DECK } from 'actions/entities/decks';

const initialState = Immutable({});

function addSlide(state, action) {
  const deck = state[action.payload.deckId];
  const previousSlideId = action.payload.previousSlideId;
  const previousSlideIndex = deck.slideIds.indexOf(previousSlideId);
  // insert the slide at the right place
  const newSlideIds = deck.slideIds
    .slice(0, previousSlideIndex + 1)
    .concat(action.payload.slideId)
    .concat(deck.slideIds.slice(previousSlideIndex + 1));

  return state.merge({
    [deck.id]: {
      slideIds: newSlideIds,
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

  return Immutable.merge(state, {
    [deckId]: {
      id: deckId,
      slideIds: Object.keys(action.payload.slidesById),
      slideSequence: Object.keys(action.payload.slidesById).length,
    },
  }, { deep: true });
}

function addDeckMetadata(state, action) {
  const deckId = action.payload.id;
  const metadata = action.payload.metadata;
  return Immutable.merge(state, {
    [deckId]: {
      id: deckId,
      meta: metadata,
    },
  }, { deep: true });
}
function deleteDeck(state, action) {
  const deckId = action.payload;
  return Immutable.without(state, deckId);
}

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_SLIDE: return addSlide(state, action);
    case DELETE_SLIDE: return deleteSlide(state, action);
    case FETCH_DECK_SUCCESS: return fetchDeckSuccess(state, action);
    case ADD_DECK_METADATA: return addDeckMetadata(state, action);
    case DELETE_DECK: return deleteDeck(state, action);
    default: return state;
  }
}

export default byId;
