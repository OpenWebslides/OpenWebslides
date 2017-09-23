export const PROFILE_PAGE_START_REQUESTS = 'PROFILE_PAGE_START_REQUESTS';
export const PROFILE_PAGE_USER_INFO_FAILURE = 'PROFILE_PAGE_USER_INFO_FAILURE';
export const PROFILE_PAGE_REQUESTS_SUCCESS = 'PROFILE_PAGE_REQUESTS_SUCCESS';


export function profilePageStartRequests(userId) {
  return {
    type: PROFILE_PAGE_START_REQUESTS,
    payload: userId,
  };
}
