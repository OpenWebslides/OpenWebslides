import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SlideContainer from 'containers/slide-editor/SlideContainer';
import { slideViewTypes } from 'constants/slideViewTypes';

import PresentationViewToolbarContainer from 'containers/presentation-view/PresentationViewToolbarContainer';
import AnnotationSidePanelContainer from 'containers/annotations/AnnotationSidePanelContainer';

class PresentationView extends Component {
  componentDidMount() {
    const { deckId } = this.props.match.params;
    this.props.fetchDeck(deckId);
  }

  renderSlide() {
    if (this.props.activeSlideId) {
      return <SlideContainer id={this.props.activeSlideId} viewType={slideViewTypes.PRESENTATION} />;
    }

    return <h1>Loading...</h1>;
  }

  renderAnnotationPanel() {
    const { annotationMode } = this.props;
    if (annotationMode) {
      return <AnnotationSidePanelContainer />;
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderSlide()}
        <PresentationViewToolbarContainer />
        {this.renderAnnotationPanel()}
      </div>
    );
  }
}

PresentationView.propTypes = {
  activeSlideId: PropTypes.string,
  fetchDeck: PropTypes.func.isRequired,
  match: PropTypes.objectOf(Object).isRequired,
  annotationMode: PropTypes.bool.isRequired,
};

PresentationView.defaultProps = {
  activeSlideId: null,
};


export default PresentationView;
