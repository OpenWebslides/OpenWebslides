import { getDefaultKeyBinding, RichUtils } from 'draft-js';

function createNestedListPlugin() {
  function onChange(editorState) {
    return editorState;
  }
  return {
    onChange,
    onTab: (e, { getEditorState, setEditorState }) => {
      const editorState = getEditorState();
      const newState = RichUtils.onTab(event, editorState, 2);
      setEditorState(newState);
    },
  };
}

const nestedListPlugin = createNestedListPlugin();

export default {
  createEmpty: '<ul><li></li></ul>',
  plugins: [nestedListPlugin],
  keyBindings: e => getDefaultKeyBinding(e),
  placeholder: 'Add list item...',
};
