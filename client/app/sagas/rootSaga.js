import signupSaga from 'sagas/signupSaga';
import confirmEmailSaga from 'sagas/confirmEmailSaga';
import requestFeedNorificationsSaga
  from 'sagas/feed/requestFeedNotificationsSaga';
import requestDeckListSaga from 'sagas/deckManagement/requestDeckListSaga';
import requestResetPasswordSaga from 'sagas/forgotPasswordSaga';
import resetPasswordSaga from 'sagas/resetPasswordSaga';
import fetchSlidesSaga from 'sagas/fetchSlidesSaga';

import oauthSigninSaga from 'sagas/signin/oauthSigninSaga';
import emailSigninSaga from 'sagas/signin/emailSigninSaga';

export default function* rootSaga() {
  yield [
    emailSigninSaga(),
    signupSaga(),
    confirmEmailSaga(),
    requestFeedNorificationsSaga(),
    requestDeckListSaga(),
    requestResetPasswordSaga(),
    resetPasswordSaga(),
    oauthSigninSaga(),
    fetchSlidesSaga(),
  ];
}
