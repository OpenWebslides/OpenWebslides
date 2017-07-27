// Get the decks.byId object.
export const getDecksById = (state) => {
  return state.entities.decks.byId;
};

// Get the single deck that matches $id.
export const getDeckById = (state, id) => {
  return state.entities.decks.byId[id];
};
