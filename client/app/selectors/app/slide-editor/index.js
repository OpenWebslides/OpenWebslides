// Get the id of the deck that is currently active in the editor.
export const getActiveDeckId = (state) => {
  return state.app.slideEditor.activeDeckId;
};

// Get the id of the slide that is currently active in the slide editing pane.
export const getActiveSlideId = (state) => {
  return state.app.slideEditor.activeSlideId;
};

// Get the id of the content item that is currently being edited.
export const getActiveContentItemId = (state) => {
  return state.app.slideEditor.activeContentItemId;
};

// Get the offset values of the current selection in the currently active contentItem.
export const getSelectionOffsets = (state) => {
  return state.app.slideEditor.selectionOffsets;
};

// Get the list of slide view types that are currently active in the editor.
export const getActiveSlideViewTypes = (state) => {
  return state.app.slideEditor.activeSlideViewTypes;
};
