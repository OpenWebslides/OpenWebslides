import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Pages
import FeedPage from 'pages/Feed';
import SignupPage from 'pages/Signup';
import SigninPage from 'pages/Signin';
import ForgotPasswordPage from 'pages/ForgotPassword';
import ResetPasswordPage from 'pages/ResetPassword';
import EmailConfirmationPage from 'pages/EmailConfirmation';
import OauthCallbackPage from 'pages/OauthCallback';

export default (
  <Route path="/">
    <IndexRoute component={FeedPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/signin" component={SigninPage} />
    <Route path="/confirmation" component={EmailConfirmationPage} />
    <Route path="/forgot_password" component={ForgotPasswordPage} />
    <Route path="/auth/omniauth" component={OauthCallbackPage} />
    <Route path="/reset_password" component={ResetPasswordPage} />
  </Route>
);
