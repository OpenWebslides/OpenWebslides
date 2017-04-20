import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from 'components/common/layout';
import Feed from 'components/feed';
import Signup from 'containers/signupContainer';
import Signin from 'containers/signinContainer';

export default (
  <Layout>
    <Route path="/">
      <IndexRoute component={Feed} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
    </Route>
  </Layout>
);
