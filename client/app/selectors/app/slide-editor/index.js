// Get the id of the deck that is currently active in the editor.
export const getActiveDeckId = (state) => {
  return state.app.slideEditor.activeDeckId;
};

// Get the id of the slide that is currently active in the slide editing pane.
export const getActiveSlideId = (state) => {
  return state.app.slideEditor.activeSlideId;
};
// Get the id of the previous slide than the one that is given as parameter.
export const getPreviousSlideId = (state, slideId) => {
  const activeDeckId = getActiveDeckId(state);
  const activeDeck = state.entities.decks.byId[activeDeckId];
  const slideIndex = activeDeck.slideIds.indexOf(slideId);
  if (slideIndex === 0) {
    return null;
  }
  else {
    return activeDeck.slideIds[slideIndex - 1];
  }
};

// Get the id of the content item that is currently active.
export const getActiveContentItemId = (state) => {
  return state.app.slideEditor.activeContentItemId;
};

// Get the id of the content item that is currently being edited.
export const getFocusedContentItemId = (state) => {
  return state.app.slideEditor.focusedContentItemId;
};

// Get the id of the content item prop that is currently being edited.
// (If this is NULL, a default should be used.)
export const getFocusedTextPropName = (state) => {
  return state.app.slideEditor.focusedTextPropName;
};

// Get the offset values of the current selection in the currently active
// contentItem.
export const getSelectionOffsets = (state) => {
  return state.app.slideEditor.selectionOffsets;
};

// Get the list of slide view types that are currently active in the editor.
export const getActiveSlideViewTypes = (state) => {
  return state.app.slideEditor.activeSlideViewTypes;
};

// Get the slide view type in which content is currently being edited.
export const getFocusedSlideViewType = (state) => {
  return state.app.slideEditor.focusedSlideViewType;
};

// True if the slide content has changed since being loaded / last being saved, false if it has not.
export const getHasChanged = (state) => {
  return state.app.slideEditor.hasChanged;
};
