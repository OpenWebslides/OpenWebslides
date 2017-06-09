import Immutable from 'seamless-immutable';

const initialState = Immutable({});

function allIds(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default allIds;
