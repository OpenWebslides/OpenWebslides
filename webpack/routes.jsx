// Libraries
import React from 'react';
import { Route } from 'react-router';

// Components
import Layout from './modules/layout';
import Feed from './modules/feed';
import Signup from './modules/signup';
import SignIn from './modules/sign_in';


export default (
  <Layout>
    <Route exact path="/" component={Feed} />
    <Route path="/signup" component={Signup} />
    <Route path="/signin" component={SignIn} />
  </Layout>
);
