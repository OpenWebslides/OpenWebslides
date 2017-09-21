import { combineReducers } from 'redux';

import byId from 'reducers/entities/users/byIdReducer';

const users = combineReducers({
  byId,
});

export default users;
