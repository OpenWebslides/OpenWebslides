import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';

// Pages
import FeedPage from 'pages/FeedPage';
import SignupPage from 'pages/SignupPage';
import SigninPage from 'pages/SigninPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';
import ResetPasswordPage from 'pages/ResetPasswordPage';
import ConfirmEmailPage from 'pages/ConfirmEmailPage';
import OauthCallbackPage from 'pages/OauthCallbackPage';
import SlideEditorPage from 'pages/SlideEditorPage';
import EditorPage from 'pages/EditorPage';

import history from './history';

export default (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={FeedPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/confirmation" component={ConfirmEmailPage} />
      <Route path="/forgot_password" component={ForgotPasswordPage} />
      <Route path="/auth/omniauth" component={OauthCallbackPage} />
      <Route path="/reset_password" component={ResetPasswordPage} />
      <Route path="/editor/slide" component={SlideEditorPage} />
      <Route path="/editortest" component={EditorPage} />
    </Switch>
  </Router>
);
