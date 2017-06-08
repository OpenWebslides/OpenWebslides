import Immutable from 'seamless-immutable';

const initialState = Immutable({});

function byId(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default byId;
