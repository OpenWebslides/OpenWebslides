import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { imgOptions, iframeOptions } from 'constants/printViewOptions';
import { jasperState } from 'constants/exampleState';

import convertToPrint from 'lib/convert-to-print/index';

export default class PrintView extends Component {
  // componentDidMount() {
  //   const id = this.props.id;
  //   if (!(this.props.entities.decks.byId.id && this.props.entities.decks.byId.id.slides)) {
  //     this.props.fetchDeckContent(id);
  //   }
  // }

  render() {
    const state = jasperState; // TODO: only until rein parser works

    const imagePref = this.props.printViewState.images;
    const decorativeImagePref = this.props.printViewState.decorativeImages;
    const iframesPref = this.props.printViewState.iframes;
    let elements;
    // if (state.entities.decks.byId.id && state.entities.decks.byId.id.slides) {
    //   elements = convertToPrint(state, this.props.id);
    // }
    elements = convertToPrint(state, this.props.id, imagePref, decorativeImagePref, iframesPref);
    return (
      <div className="c_print-view">
        {elements}
      </div>
    );
  }
}

PrintView.propTypes = {
  printViewState: PropTypes.shape({
    images: PropTypes.oneOf(Object.keys(imgOptions)),
    iframes: PropTypes.oneOf(Object.keys(iframeOptions)),
    decorativeImages: PropTypes.bool,
  }).isRequired,
  fetchDeckContent: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
