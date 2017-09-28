import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { ADD_SLIDE, DELETE_SLIDE } from 'actions/entities/slides';
import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';

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

  return state.merge({
    [deckId]: {
      id: deckId,
      meta: {},
      slideIds: Object.keys(action.payload.slidesById),
      slideSequence: Object.keys(action.payload.slidesById).length,
    },
  });
}

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_SLIDE: return addSlide(state, action);
    case DELETE_SLIDE: return deleteSlide(state, action);
    case FETCH_DECK_SUCCESS: return fetchDeckSuccess(state, action);
    default: return state;
  }
}

export default byId;
