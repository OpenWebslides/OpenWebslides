export const SET_USER = 'SET_USER';

export const SET_USER_DECKS_IDS = 'SET_USER_DECKS_IDS';

export const SET_USER_COLLABORATIONS = 'SET_USER_COLLABORATIONS';

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function setUserCollaborations(userId, collaborationIds) {
  return {
    type: SET_USER_COLLABORATIONS,
    payload: { userId, collaborationIds },
  };
}

export function setUserDecksIds(userId, decksIds) {
  return {
    type: SET_USER_DECKS_IDS,
    payload: { userId, decksIds },
  };
}
