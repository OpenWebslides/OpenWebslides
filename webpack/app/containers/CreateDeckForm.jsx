import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// Fields
import inputField from 'presentationals/formFields/InputField';

// Actions

import { DECK_CREATION_REQUEST } from 'actions/createDeckActions';
