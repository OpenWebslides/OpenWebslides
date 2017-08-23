export const getActiveDeckId = (state) => {
  return state.app.presentationView.activeDeckId;
};

export const getActiveSlideId = (state) => {
  return state.app.presentationView.activeSlideId;
};

export const getActiveConversationId = (state) => {
  return state.app.annotations.activeConversationId;
};
