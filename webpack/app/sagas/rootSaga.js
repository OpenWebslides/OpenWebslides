import signupSaga from 'sagas/signupSaga';
import confirmEmailSaga from 'sagas/confirmEmailSaga';
import requestResetPasswordSaga from 'sagas/resetPassword/requestResetPasswordSaga';
import resetPasswordSaga from 'sagas/resetPassword/resetPasswordSaga';
import emailAvailableSaga from 'sagas/serverValidation/emailAvailableSaga';

import oauthSigninSaga from 'sagas/signin/oauthSigninSaga';
import emailSigninSaga from 'sagas/signin/emailSigninSaga';

export default function* rootSaga() {
  yield [
    emailSigninSaga(),
    signupSaga(),
    confirmEmailSaga(),
    emailAvailableSaga(),
    requestResetPasswordSaga(),
    resetPasswordSaga(),
    oauthSigninSaga(),
  ];
}
