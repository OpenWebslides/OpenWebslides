import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SlideEditor extends Component {
  componentDidMount() {
    this.props.fetchDeckContent(2);
  }

  render() {
    return <main className="l_main" />;
  }
}

SlideEditor.propTypes = {
  fetchDeckContent: PropTypes.func.isRequired,
};
