import { getDefaultKeyBinding } from 'draft-js';

export default {
  createEmpty: '<h2></h2>',

  keyBindings: e => {
    // Disable Return
    if (e.keyCode === 13) {
      return false;
    }
    return getDefaultKeyBinding(e);
  },
  placeholder: 'Add subtitle...',
};
