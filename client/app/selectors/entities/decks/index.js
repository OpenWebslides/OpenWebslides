// Get the decks.byId object.
export const getDecksById = (state) => {
  return state.entities.decks.byId;
};

// Get the single deck that matches $id.
export const getDeckById = (state, id) => {
  return state.entities.decks.byId[id];
};

export const getSlideIdsById = (state, id) => {
  if (state.entities.decks.byId[id]) {
    return state.entities.decks.byId[id].slideIds;
  }
  return [];
};

export const getSlideCountById = (state, id) => {
  if (state.entities.decks.byId[id] && state.entities.decks.byId[id].slideIds) {
    return state.entities.decks.byId[id].slideIds.length;
  }
  return 0;
};
