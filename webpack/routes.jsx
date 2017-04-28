import React from 'react';
import { Route, IndexRoute } from 'react-router';
// import { routerActions } from 'react-router-redux';
// import { UserAuthWrapper } from 'redux-auth-wrapper';

// Pages
import FeedPage from 'pages/feedPage';
import SignupPage from 'pages/signupPage';
import SigninPage from 'pages/signinPage';
import EmailConfirmationPage from 'pages/emailConfirmationPage';

// // Redirects to /signin when not authenticated
// const UserIsAuthenticated = UserAuthWrapper({
//   // Get the current auth state
//   authSelector: state => state.local.auth,
//   // Checks the isAuthenticated value in the auth state to determine if a user is authenticated
//   predicate: auth => auth.isAuthenticated,
//   // React-redux-router action to dispatch for redirect
//   redirectAction: routerActions.replace,
//   // Path we want to redirect to
//   failureRedirectPath: '/signin',
//   // A descriptive name for this auth check
//   wrapperDisplayName: 'UserIsAuthenticated',
// });

export default (
  <Route path="/">
    <IndexRoute component={FeedPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/signin" component={SigninPage} />
    <Route path="/confirm_email" component={EmailConfirmationPage} />
  </Route>
);
