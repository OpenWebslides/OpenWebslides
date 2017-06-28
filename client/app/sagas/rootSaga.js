import signupSaga from 'sagas/signupSaga';
import confirmEmailSaga from 'sagas/confirmEmailSaga';
import requestFeedNorificationsSaga from 'sagas/feed/requestFeedNotificationsSaga';
import requestResetPasswordSaga from 'sagas/forgotPasswordSaga';
import resetPasswordSaga from 'sagas/resetPasswordSaga';
import fetchSlidesSaga from 'sagas/fetchSlidesSaga';
import deleteSlideSaga from 'sagas/deleteSlideSaga';

import oauthSigninSaga from 'sagas/signin/oauthSigninSaga';
import emailSigninSaga from 'sagas/signin/emailSigninSaga';

import requestDeckListSaga from 'sagas/deckManagement/requestDeckListSaga';
import createDeckSaga from 'sagas/deckManagement/createDeckSaga';
import deleteDeckSaga from 'sagas/deckManagement/deleteDeckSaga';

import updateDeckSaga from 'sagas/updateDeckSaga';

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
    deleteSlideSaga(),
    fetchSlidesSaga(),
    createDeckSaga(),
    deleteDeckSaga(),
    updateDeckSaga(),
  ];
}
