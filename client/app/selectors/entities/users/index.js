
// Get the deck Ids of a specific user.
export const getUserDecksIds = (state, userId) => {
  return state.entities.users.byId[userId].decks;
};

// Get the Ids of a specific user's collaborations.
export const getUserCollaborationsIds = (state, userId) => {
  return state.entities.users.byId[userId].collaborations;
};
