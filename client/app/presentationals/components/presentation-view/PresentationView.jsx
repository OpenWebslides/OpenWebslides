import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SlideContainer from 'containers/slide-editor/SlideContainer';
import { slideViewTypes } from 'constants/slideViewTypes';
import PresentationViewToolbarContainer from
  'containers/presentation-view/PresentationViewToolbarContainer';
import AnnotationSidePanel from 'presentationals/components/annotations/AnnotationSidePanel';
import CourseNotePanel from 'containers/CourseNotePanelContainer';

class PresentationView extends Component {
  componentDidMount() {
    const { deckId } = this.props.match.params;
    this.props.fetchDeck(deckId);
  }

  componentDidUpdate(prevProps) {
    const { setActiveSlide, activeSlideId, location: { hash } } = this.props;

    if (!prevProps.activeSlideId && hash) {
      const slideId = hash.slice(1);
      setActiveSlide(slideId);
    }

    if (activeSlideId) {
      window.history.replaceState(null, null, `#${activeSlideId}`);
    }
  }

  renderSlide() {
    const { deckId } = this.props.match.params;
    if (this.props.activeSlideId) {
      return (
        <div className="c_presentation-view">
          <SlideContainer id={this.props.activeSlideId} viewType={slideViewTypes.PRESENTATION} />
          <AnnotationSidePanel deckId={deckId} />
        </div>
      );
    }

    return <h1>Loading...</h1>;
  }

  render() {
    const { deckId } = this.props.match.params;

    return (
      <div>
        {this.renderSlide()}
        <PresentationViewToolbarContainer deckId={deckId} />
        <CourseNotePanel />
      </div>
    );
  }
}

PresentationView.propTypes = {
  activeSlideId: PropTypes.string,
  fetchDeck: PropTypes.func.isRequired,
  setActiveSlide: PropTypes.func.isRequired,
  match: PropTypes.objectOf(Object).isRequired,
  annotationMode: PropTypes.bool.isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

PresentationView.defaultProps = {
  activeSlideId: null,
};


export default PresentationView;
