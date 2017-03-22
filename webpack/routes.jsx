// Libraries
import React from 'react';
import { Route } from 'react-router';

// Components
import Layout from './modules/layout';
import Feed from './modules/feed';
import Signup from './modules/signup';

export default (
  <Layout>
    <Route path="/" component={Feed} />
    <Route path="/signup" component={Signup} />
  </Layout>
);
