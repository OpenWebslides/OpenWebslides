import React from 'react';
import { Route, IndexRoute } from 'react-router';
// import { routerActions } from 'react-router-redux';
// import { UserAuthWrapper } from 'redux-auth-wrapper';

// Pages
import FeedPage from 'pages/feedPage';
import SignupPage from 'pages/signupPage';
import SigninPage from 'pages/signinPage';
import RequestResetPasswordPage from 'pages/resetPassword/requestResetPasswordPage';
import ResetPasswordPage from 'pages/resetPassword/resetPasswordPage';
import EmailConfirmationPage from 'pages/emailConfirmationPage';
import OAuthCallbackPage from 'pages/oauthCallbackPage';

export default (
  <Route path="/">
    <IndexRoute component={FeedPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/signin" component={SigninPage} />
    <Route path="/confirmation" component={EmailConfirmationPage} />
    <Route path="/request_reset_password" component={RequestResetPasswordPage} />
    <Route path="/auth/omniauth" component={OAuthCallbackPage} />
    <Route path="/reset_password" component={ResetPasswordPage} />
  </Route>
);
