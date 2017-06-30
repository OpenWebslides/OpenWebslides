import { getDefaultKeyBinding } from 'draft-js';

export default {
  createEmpty: '<h1></h1>',
  keyBindings: e => {
    // Disable Return
    if (e.keyCode === 13) {
      return false;
    }
    return getDefaultKeyBinding(e);
  },
  placeholder: 'Add title...',
};
