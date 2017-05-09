import signupSaga from 'sagas/signup';
import confirmEmailSaga from 'sagas/confirmEmail';
import requestResetPasswordSaga from 'sagas/forgotPassword';
import resetPasswordSaga from 'sagas/resetPassword';
import emailAvailableSaga from 'sagas/checkEmail';

import oauthSigninSaga from 'sagas/signin/oauthSignin';
import emailSigninSaga from 'sagas/signin/emailSignin';

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
