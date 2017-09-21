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
import PrintViewPage from 'presentationals/pages/PrintViewPage';
import PrintViewOnlyPage from 'presentationals/pages/PrintViewOnlyPage';
import ImportDeckPage from 'presentationals/pages/ImportDeckPage';
import PresentationViewPage from 'presentationals/pages/PresentationViewPage';
import UserPage from 'presentationals/pages/UserPage';

import history from './history';

export default (
  <Router history={history}>
    <Switch>
      <Route path="/" exact={true} component={Dashboard} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/print/:id" component={PrintViewPage} />
      <Route path="/printOnly/:id" component={PrintViewOnlyPage} />
      <Route path="/confirmation" component={ConfirmEmailPage} />
      <Route path="/forgot_password" component={ForgotPasswordPage} />
      <Route path="/oauth/omniauth" component={OauthCallbackPage} />
      <Route path="/reset_password" component={ResetPasswordPage} />
      <Route path="/editor/:deckId" component={SlideEditorPage} />
      <Route path="/presentation/:deckId" component={PresentationViewPage} />
      <Route path="/create_new_deck" component={CreateDeckPage} />
      <Route path="/import_deck" component={ImportDeckPage} />
      <Route path="/users/:userId" component={UserPage} />
    </Switch>
  </Router>
);
