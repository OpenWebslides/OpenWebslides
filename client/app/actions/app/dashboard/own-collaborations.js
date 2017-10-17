export const OWN_COLLABORATIONS_REQUESTS_START = 'OWN_COLLABORATIONS_REQUESTS_START';
export const OWN_COLLABORATIONS_REQUESTS_FAILURE = 'OWN_COLLABORATIONS_REQUESTS_FAILURE';
export const OWN_COLLABORATIONS_REQUESTS_SUCCESS = 'OWN_COLLABORATIONS_REQUESTS_SUCCESS';


export function ownCollaborationsRequestsStart(userId) {
  return {
    type: OWN_COLLABORATIONS_REQUESTS_START,
    payload: userId,
  };
}

export function ownCollaborationsRequestsFailure(message) {
  return {
    type: OWN_COLLABORATIONS_REQUESTS_FAILURE,
    payload: { message },
  };
}

export function ownCollaborationsRequestsSuccess() {
  return {
    type: OWN_COLLABORATIONS_REQUESTS_SUCCESS,
  };
}
