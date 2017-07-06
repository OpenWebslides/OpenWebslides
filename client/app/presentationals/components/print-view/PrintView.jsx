import React, { Component } from 'react';
import PropTypes from 'prop-types';

import convertToPrint from 'lib/convert-to-print/index';
import { flamesDeck, smallDeck, jasperDeck } from 'constants/exampleDecks'; // TODO: only for testing

export default class SlideEditor extends Component {
  componentDidMount() {
    this.props.fetchDeckContent(2);
  }

  render() {
    const elements = convertToPrint(jasperDeck);
    return (
      <div>
        {elements}
      </div>
    );
  }
}

SlideEditor.propTypes = {
  fetchDeckContent: PropTypes.func.isRequired,
};
