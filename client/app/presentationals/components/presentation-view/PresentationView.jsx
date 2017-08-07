import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PresentationView extends Component {
  componentDidMount() {
    const { deckId } = this.props.match.params;
    this.props.fetchDeck(deckId);
  }

  render() {
    console.log(this.props);
    return (
      <h1>Getting there</h1>
    );
  }
}

PresentationView.propTypes = {
  fetchDeck: PropTypes.func.isRequired,
  match: PropTypes.objectOf(Object).isRequired,
};

export default PresentationView;
