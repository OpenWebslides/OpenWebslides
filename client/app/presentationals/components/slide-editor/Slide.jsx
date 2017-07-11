import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  updateSlideContainerSize() {
    // Fullscreen slide sizing can be handled CSS only; only use Javascript to
    // resize if the slide isn't displayed fullscreen.
    if (!this.props.isFullscreen) {
      // note: 'sc' == 'slideContainer'
      // get the slideContainer size wrapper element
      const scSizeElement = this.slideContainer.getElementsByClassName(
        'c_slide-container__size',
      )[0];

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
      const scComputedFontSize = window.getComputedStyle(this.slideContainer,
        null).getPropertyValue('font-size');
      const scComputedFontSizeFloat = parseFloat(
        scComputedFontSize.replace('px', ''),
      );
      scSizeElement.style.fontSize = `${scComputedFontSizeFloat * factor}px`;

      // (Note: this only works because we use exclusively em and % units, allowing
      // elements to be resizeable by changing their font-size. Anything defined in
      // other units such as rem or px will not scale with the rest of the slide.)
    }
  }

  render() {
    return (
      <div
        className={`c_slide-container c_slide-container--${this.props.cssIdentifier} ${this.props.isFullscreen ? 'c_slide-container--fullscreen' : ''}`}
        ref={slideContainer => {
          this.slideContainer = slideContainer;
        }}
      >
        <div className="c_slide-container__size">
          <div className="c_slide-container__wrapper">
            <div className="c_slide-container__content">
              {this.props.children}
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
  children: PropTypes.node.isRequired,
};

Slide.defaultProps = {
  cssIdentifier: 'default',
  isFullscreen: false,
};

export default Slide;
