// Get the id of the deck that is currently active in the editor.
export const getActiveDeckId = state => state.app.slideEditor.activeDeckId;

// Get the id of the slide that is currently active in the slide editing pane.
export const getActiveSlideId = state => state.app.slideEditor.activeSlideId;

// Get the id of the content item that is currently being edited.
export const getActiveContentItemId = state => state.app.slideEditor.activeContentItemId;

// Get the offset values of the current selection in the currently active contentItem.
export const getSelectionOffsets = state => state.app.slideEditor.selectionOffsets;

// Get the slide view type in which content is currently being edited.
export const getFocusedSlideViewType = state => state.app.slideEditor.focusedSlideViewType;

// Get the list of slide view types that are currently active in the editor.
export const getActiveSlideViewTypes = state => state.app.slideEditor.activeSlideViewTypes;
