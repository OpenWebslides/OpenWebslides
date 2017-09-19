import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { imgOptions, iframeOptions } from 'constants/printViewOptions';

import convertToPrint from 'lib/convert-to-print/index';

function waitForImagesAndPrint(id) {
  const images = Array.from(document.getElementsByTagName('img'));

  let allComplete = true;

  images.forEach((img) => {
    if (!img.complete) {
      allComplete = false;
    }
  });

  if (!allComplete) {
    setTimeout(() => waitForImagesAndPrint(id), 200);
  }
  else {
    window.print();
    window.location.href = `/print/${id}`;
  }
}

export default class PrintView extends Component {
  componentDidMount() {
    const id = this.props.id;
    this.props.fetchDeckComments(id);
    if (!_.get(this.props, `entities.decks.byId.${id}.slideIds`, false)) {
      this.props.fetchDeck(id);
    }
    else if (this.props.printAndClose) {
      waitForImagesAndPrint(id);
    }
  }

  componentDidUpdate() {
    console.log('updated');
    const id = this.props.id;
    if (_.get(this.props, `entities.decks.byId.${id}.slideIds`, false) && this.props.printAndClose) {
      waitForImagesAndPrint(id);
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
    }
    else {
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
  fetchConversations: PropTypes.func.isRequired,
  fetchDeckComments: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  printAndClose: PropTypes.bool,
};

PrintView.defaultProps = {
  printAndClose: false,
};
