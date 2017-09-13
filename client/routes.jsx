import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';

// Pages
import Dashboard from 'presentationals/pages/Dashboard';
import OauthCallbackPage from 'presentationals/pages/OauthCallbackPage';
import SlideEditorPage from 'presentationals/pages/SlideEditorPage';
import CreateDeckPage from 'presentationals/pages/CreateDeckPage';
import PrintViewPage from 'presentationals/pages/PrintViewPage';
import ImportDeckPage from 'presentationals/pages/ImportDeckPage';
import PresentationViewPage from 'presentationals/pages/PresentationViewPage';

import history from './history';

export default (
  <Router history={history}>
    <Switch>
      <Route path="/" exact={true} component={Dashboard} />
      <Route path="/oauth/omniauth" component={OauthCallbackPage} />
      <Route path="/editor/:deckId" component={SlideEditorPage} />
      <Route path="/presentation/:deckId" component={PresentationViewPage} />
      <Route path="/create_new_deck" component={CreateDeckPage} />
      <Route path="/import_deck" component={ImportDeckPage} />
      <Route path="/print/:id" component={PrintViewPage} />
    </Switch>
  </Router>
);
