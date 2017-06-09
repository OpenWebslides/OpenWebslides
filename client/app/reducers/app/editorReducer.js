import Immutable from 'seamless-immutable';

const initialState = Immutable({
  currentDeck: null,
  currentSlide: null,
});

function editor(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default editor;
