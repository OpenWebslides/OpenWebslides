import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import EditorViewsPanel from './EditorViewsPanel';
import parseDeckObject from '../../lib/parseDeckObject';

class SlideEditor extends Component {
  componentDidMount() {
    this.activeSlide = 'hm?';
  }

  shouldComponentUpdate(nextProps) {
    if (this.selectedSlideId === nextProps.activeDeck.slides.selectedSlide) {
      return false;
    }
    return true;
  }

  render() {
    const { activeDeck } = this.props;
    if (!_.isEmpty(activeDeck)) {
      const selectedSlideId = this.props.activeDeck.slides.selectedSlide;
      const editorState = parseDeckObject(this.props.activeDeck);
      const activeSlide = editorState.filter(
        slide => slide.props.id === selectedSlideId,
      );
      return (
        <div
          className={`c_slide-editor c_slide-editor--${this.props.cssIdentifier}`}
        >
          <div className="c_slide-editor__wrapper">
            {/* <div className="c_slide-editor__item c_slide-editor__item--toolbar">
          <p>[Toolbar goes here]</p>
        </div> */}
            <div className="c_slide-editor__item c_slide-editor__item--views-panel">
              <EditorViewsPanel activeSlide={activeSlide} />
            </div>
            {/* #TODO
        <div className="c_slide-editor__item c_slide-editor__item--slide-health">
          <p>[Slide health goes here]</p>
        </div> */}
          </div>
        </div>
      );
    }
    return (
      <div
        className={`c_slide-editor c_slide-editor--${this.props.cssIdentifier}`}
      >
        <div className="c_slide-editor__wrapper">
          {/* <div className="c_slide-editor__item c_slide-editor__item--toolbar">
          <p>[Toolbar goes here]</p>
        </div> */}
          <div className="c_slide-editor__item c_slide-editor__item--views-panel">
            <EditorViewsPanel />
          </div>
          {/* #TODO
        <div className="c_slide-editor__item c_slide-editor__item--slide-health">
          <p>[Slide health goes here]</p>
        </div> */}
        </div>
      </div>
    );
  }
}

SlideEditor.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
  activeDeck: PropTypes.objectOf(Object).isRequired,
};

SlideEditor.defaultProps = {
  cssIdentifier: 'default',
};

function mapStateToProps(state) {
  return {
    activeDeck: state.data.activeDeck,
  };
}

export default connect(mapStateToProps)(SlideEditor);
