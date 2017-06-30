import { getDefaultKeyBinding } from 'draft-js';

export default {
  createEmpty: '<p></p>',
  keyBindings: e => getDefaultKeyBinding(e),
  placeholder: 'Add text...',
};
