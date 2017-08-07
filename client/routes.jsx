import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';

// Pages
import Dashboard from 'presentationals/pages/Dashboard';
import SignupPage from 'presentationals/pages/SignupPage';
import SigninPage from 'presentationals/pages/SigninPage';
import ForgotPasswordPage from 'presentationals/pages/ForgotPasswordPage';
import ResetPasswordPage from 'presentationals/pages/ResetPasswordPage';
import ConfirmEmailPage from 'presentationals/pages/ConfirmEmailPage';
import OauthCallbackPage from 'presentationals/pages/OauthCallbackPage';
import SlideEditorPage from 'presentationals/pages/SlideEditorPage';
import CreateDeckPage from 'presentationals/pages/CreateDeckPage';
import PresentationPage from 'presentationals/pages/PresentationPage';

import history from './history';

export default (
  <Router history={history}>
    <Switch>
      <Route path="/" exact={true} component={Dashboard} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/confirmation" component={ConfirmEmailPage} />
      <Route path="/forgot_password" component={ForgotPasswordPage} />
      <Route path="/oauth/omniauth" component={OauthCallbackPage} />
      <Route path="/reset_password" component={ResetPasswordPage} />
      <Route path="/editor/:deckId" component={SlideEditorPage} />
      <Route path="/presentation/:deckId" component={PresentationPage} />
      <Route path="/create_new_deck" component={CreateDeckPage} />
    </Switch>
  </Router>
);
