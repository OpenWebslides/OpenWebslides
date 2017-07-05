import React, { Component } from 'react';
import PropTypes from 'prop-types';

import convertToPrint from 'lib/convert-to-print/index';
import { flamesDeck, smallDeck } from 'constants/exampleDecks'; // TODO: only for testing

export default class SlideEditor extends Component {
  componentDidMount() {
    this.props.fetchDeckContent(2);
  }

  render() {
    const elements = convertToPrint(flamesDeck);
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
