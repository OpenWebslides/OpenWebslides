// Get the decks.byId object.
export const getDecksById = state => state.entities.decks.byId;

// Get the single deck that matches $id.
export const getDeckById = (state, id) => state.entities.decks.byId[id];
