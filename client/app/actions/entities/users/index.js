export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const FETCH_USER_DECKS_IDS = 'FETCH_USER_DECKS_IDS';
export const FETCH_USER_DECKS_IDS_SUCCESS = 'FETCH_USER_DECKS_IDS_SUCCESS';
export const FETCH_USER_DECKS_IDS_FAILURE = 'FETCH_USER_DECKS_IDS_FAILURE';

export const FETCH_USER_COLLABORATIONS = 'FETCH_USER_COLLABORATIONS';
export const FETCH_USER_COLLABORATIONS_SUCCESS = 'FETCH_USER_COLLABORATIONS_SUCCESS';
export const FETCH_USER_COLLABORATIONS_FAILURE = 'FETCH_USER_COLLABORATIONS_FAILURE';



export function fetchUserCollaborations(userId) {
  return {
    type: FETCH_USER_COLLABORATIONS,
    meta: { userId },
  };
}
export function fetchUserDecksIds(userId) {
  return {
    type: FETCH_USER_DECKS_IDS,
    meta: { userId },
  };
}

export function fetchUser(userId) {
  return {
    type: FETCH_USER,
    meta: { userId },
  };
}

export function fetchUserSuccess(userId) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { userId },
  };
}
