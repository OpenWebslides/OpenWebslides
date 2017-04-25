import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';

// Pages
import FeedPage from 'presentationals/pages/FeedPage';
import SignupPage from 'presentationals/pages/SignupPage';
import SigninPage from 'presentationals/pages/SigninPage';
import ForgotPasswordPage from 'presentationals/pages/ForgotPasswordPage';
import ResetPasswordPage from 'presentationals/pages/ResetPasswordPage';
import ConfirmEmailPage from 'presentationals/pages/ConfirmEmailPage';
import OauthCallbackPage from 'presentationals/pages/OauthCallbackPage';
import SlideEditorPage from 'presentationals/pages/SlideEditorPage';
import EditorPage from 'presentationals/pages/EditorPage';

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
