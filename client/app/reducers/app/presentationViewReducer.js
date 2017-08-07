import Immutable from 'seamless-immutable';

const initialState = Immutable({
  activeDeckId: null,
  activeSlideId: null,
});

function presentationView(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default presentationView;
