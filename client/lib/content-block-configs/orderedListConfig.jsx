import { RichUtils } from 'draft-js';

function createNestedListPlugin() {
  return {
    onTab: (e, { getEditorState, setEditorState }) => {
      const editorState = getEditorState();
      const newState = RichUtils.onTab(event, editorState, 3);
      setEditorState(newState);
    },
  };
}

const nestedListPlugin = createNestedListPlugin();

export default {
  createEmpty: '<ol><li></li></ol>',
  plugins: [nestedListPlugin],
  placeholder: 'Add list item...',
};
