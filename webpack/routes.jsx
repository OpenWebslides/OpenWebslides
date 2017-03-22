// Libraries
import React from 'react';
import { Route } from 'react-router';

// Components
import Layout from './modules/layout';
import Feed from './modules/feed';
import SignUp from './modules/sign_up';
import SignIn from './modules/sign_in';


export default (
  <Layout>
    <Route exact path="/" component={Feed} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
  </Layout>
);
