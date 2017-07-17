// Get the slides by id object.
export const getSlidesById = (state) => {
  return state.entities.slides.byId;
};

// Get the single slide that matches props.slideId.
export const getSlideById = (state, props) => {
  return state.entities.slides.byId[props.slideId];
};