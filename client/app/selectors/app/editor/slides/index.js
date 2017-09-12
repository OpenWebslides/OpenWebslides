// Get the id of the slide that is currently active in the slide editing pane.
export const getActiveSlideId = (state) => {
  return state.app.editor.slides.active;
};
