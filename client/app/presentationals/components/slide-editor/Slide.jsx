import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes } from 'constants/slideViewTypes';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

class Slide extends Component {
  constructor(props) {
    super(props);
    this.updateSlideContainerSize = this.updateSlideContainerSize.bind(this);
  }

  componentDidMount() {
    this.updateSlideContainerSize();
    window.addEventListener('resize', this.updateSlideContainerSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSlideContainerSize);
  }

  componentDidUpdate() {
    this.updateSlideContainerSize();
  }

  updateSlideContainerSize() {
    // Fullscreen slide sizing can be handled CSS only; only use Javascript to
    // resize if the slide isn't displayed fullscreen.
    if (!this.props.isFullscreen) {
      // note: 'sc' == 'slideContainer'
      // get the slideContainer size wrapper element
      const scSizeElement = this.slideContainer.getElementsByClassName('c_slide-container__size')[0];

      // remove sizing that might have been set by a previous call of this function
      scSizeElement.removeAttribute('style');

      // calculate the horizontal & vertical scaling factors
      // between the slideContainer and its size wrapper
      const scRect = this.slideContainer.getBoundingClientRect();
      const scSizeElementRect = scSizeElement.getBoundingClientRect();
      const horizontalFactor = scRect.width / scSizeElementRect.width;
      const verticalFactor = scRect.height / scSizeElementRect.height;

      // if the vertical factor === 1 (meaning the container has no set height),
      // use the horizontal factor
      // otherwise, use whichever factor is smallest, so the slide wrapper always
      // fits in the slide container
      let factor;
      if (verticalFactor !== 1 && verticalFactor < horizontalFactor) {
        factor = verticalFactor;
      } else {
        factor = horizontalFactor;
      }

      // get the computed font size of the container, multiply it by the scaling factor,
      // and set it on the size wrapper element so that it will scale to fit its container
      const scComputedFontSize = window.getComputedStyle(this.slideContainer, null).getPropertyValue('font-size');
      const scComputedFontSizeFloat = parseFloat(scComputedFontSize.replace('px', ''));
      scSizeElement.style.fontSize = `${scComputedFontSizeFloat * factor}px`;

      // (Note: this only works because we use exclusively em and % units, allowing
      // elements to be resizeable by changing their font-size. Anything defined in
      // other units such as rem or px will not scale with the rest of the slide.)
    }
  }

  render() {
    let slideContent;

    if (this.props.slide) {
      slideContent = this.props.slide.contentItemIds.map(id =>
        <ContentItemContainer
          key={id}
          slideViewType={slideViewTypes.LIVE}
          contentItemId={id}
          ancestorItemIds={[]}
          slideId={this.props.slide.id}
          editable={this.props.editable}
          headingLevel={1}
        />,
      );
    } else {
      slideContent = <p>Loading...</p>;
    }

    return (
      <div
        className={`c_slide-container c_slide-container--${this.props.cssIdentifier} ${this.props.isFullscreen
          ? 'c_slide-container--fullscreen'
          : ''}`}
        ref={slideContainer => {
          this.slideContainer = slideContainer;
        }}
      >

        <div className="c_slide-container__size">
          <div className="c_slide-container__wrapper">
            <div className="c_slide-container__content ows-slide">
              {slideContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Slide.propTypes = {
  cssIdentifier: PropTypes.string,
  isFullscreen: PropTypes.bool,
  slide: PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    contentItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    contentItemSequence: PropTypes.number.isRequired,
  }).isRequired,
  editable: PropTypes.bool.isRequired,
  // We need to connect these to force a rerender (and thus a resize) when the active slide view types change.
  activeSlideViewTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Slide.defaultProps = {
  cssIdentifier: 'default',
  isFullscreen: false,
  slide: null,
  editable: false,
};

export default Slide;
