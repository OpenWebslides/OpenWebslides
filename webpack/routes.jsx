import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './modules/layout';
import Feed from './modules/feed';
import Signup from './modules/signup';
import Signin from './modules/signin';

export default (
  <Layout>
    <Route path="/">
      <IndexRoute component={Feed} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
    </Route>
  </Layout>
);
