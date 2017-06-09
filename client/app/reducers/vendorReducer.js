import { combineReducers } from 'redux';

import { reducer as forms } from 'redux-form';

const vendor = combineReducers({
  forms,
});

export default vendor;
