// Get the slides.byId object.
export const getSlidesById = (state) => {
  return state.entities.slides.byId;
};

// Get the single slide that matches $id.
export const getSlideById = (state, id) => {
  return state.entities.slides.byId[id];
};
