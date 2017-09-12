import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { imgOptions, iframeOptions } from 'constants/printViewOptions';
// import { jasperState } from 'constants/exampleState';

import convertToPrint from 'lib/convert-to-print/index';

export default class PrintView extends Component {
  // TODO: This will have to be fixed after we are actually stocking decks in the back end
  componentDidMount() {
    const id = this.props.id;
    if (!_.get(this.props, `entities.decks.byId.${id}.slideIds`, false)) {
      this.props.fetchDeck(id);
    }
  }

  render() {
    const entities = this.props.entities;

    // Get the display preferences from the state:
    const imagePref = this.props.printViewState.images;
    const decorativeImagePref = this.props.printViewState.decorativeImages;
    const iframesPref = this.props.printViewState.iframes;

    let toDisplay;
    if (!_.get(this.props, `entities.decks.byId.${this.props.id}.slideIds`, false)) {
      toDisplay = <div> <p> Loading ...</p> </div>;
    } else {
      // We pass the entities and preferences as argument to the converter function.
      const elements = convertToPrint(entities, this.props.id, imagePref, decorativeImagePref, iframesPref);
      toDisplay = (
        <div className="c_print-view">
          {elements}
        </div>
      );
    }
    return toDisplay;
  }
}

PrintView.propTypes = {
  printViewState: PropTypes.shape({
    images: PropTypes.oneOf(Object.keys(imgOptions)),
    iframes: PropTypes.oneOf(Object.keys(iframeOptions)),
    decorativeImages: PropTypes.bool,
  }).isRequired,
  entities: PropTypes.object,
  fetchDeck: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
