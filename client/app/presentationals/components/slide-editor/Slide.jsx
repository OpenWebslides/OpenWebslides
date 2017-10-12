import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes } from 'constants/slideViewTypes';
import { slideShape } from 'constants/propTypeShapes';
import { initialHeadingLevels } from 'constants/slideOptions';

import ContentItemContainer from 'lib/content-item-container/ContentItemContainer';

class Slide extends Component {
  constructor(props) {
    super(props);
    this.updateSlideContainerSize = this.updateSlideContainerSize.bind(this);
  }

  componentDidMount() {
    this.updateSlideContainerSize();
    window.addEventListener('resize', this.updateSlideContainerSize);
  }

  componentDidUpdate() {
    this.updateSlideContainerSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSlideContainerSize);
  }

  updateSlideImageContainersSize() {
    const slideHeight = (this.slideContainer.getElementsByClassName(
      'ows_slide__overflow',
    )[0]).getBoundingClientRect().height;
    const slideWrapper = this.slideContainer.getElementsByClassName(
      'ows_slide__wrapper',
    )[0];
    const slideWrapperComputedStyle = window.getComputedStyle(slideWrapper, null);
    const imageContainers = this.slideContainer.getElementsByClassName(
      'ows_image-container',
    );
    const imageContainersArray = Array.from(imageContainers);

    // Temporarily hide imageContainers in order to measure remaining content height.
    if (imageContainersArray.length > 0) {
      /* eslint-disable no-param-reassign */
      imageContainersArray.forEach((imageContainer) => {
        imageContainer.style.display = 'none';
      });
      /* eslint-enable */
    }

    // Calculate imageContainer height to make them fill the remaining space.
    const slideContentsHeightWithoutImageContainers = slideWrapper.getBoundingClientRect().height;
    const slidePaddingTop = slideWrapperComputedStyle.getPropertyValue('padding-top');
    const slidePaddingBottom = slideWrapperComputedStyle.getPropertyValue('padding-bottom');
    const slidePaddingTopFloat = parseFloat(slidePaddingTop.replace('px', ''));
    const slidePaddingBottomFloat = parseFloat(slidePaddingBottom.replace('px', ''));
    const slideContentMaxHeight = slideHeight - slidePaddingTopFloat - slidePaddingBottomFloat;
    const slideFreeSpace = slideContentMaxHeight - slideContentsHeightWithoutImageContainers;
    const imageContainerHeight = slideFreeSpace / imageContainersArray.length;

    // Set imageContainer height and make them visible again.
    if (imageContainersArray.length > 0) {
      /* eslint-disable no-param-reassign */
      imageContainersArray.forEach((imageContainer) => {
        // Note: imageContainerHeight that is too small (because of too much content on the slide)
        // is handled by min-height in the CSS.
        if (imageContainerHeight > 0) {
          imageContainer.style.height = `${imageContainerHeight}px`;
        }
        imageContainer.style.display = 'block';
      });
      /* eslint-enable */
    }
  }

  updateSlideContainerSize() {
    // Fullscreen slide sizing can be handled CSS only; only use Javascript to resize
    // if the slide isn't displayed fullscreen.
    if (!this.props.isFullscreen) {
      // Get the slideContainer size wrapper element. (Note: 'sc' == 'slideContainer'.)
      const scSizeElement = this.slideContainer.getElementsByClassName(
        'c_slide-container__size',
      )[0];

      // Remove sizing that might have been set by a previous call of this function.
      scSizeElement.removeAttribute('style');

      // Calculate the horizontal & vertical scaling factors
      // between the slideContainer and its size wrapper.
      const scRect = this.slideContainer.getBoundingClientRect();
      const scSizeElementRect = scSizeElement.getBoundingClientRect();
      const horizontalFactor = scRect.width / scSizeElementRect.width;
      const verticalFactor = scRect.height / scSizeElementRect.height;

      // If the vertical factor === 1 (meaning the container has no set height),
      // use the horizontal factor.
      // Otherwise, use whichever factor is smallest,
      // so the slide wrapper always fits in the slide container.
      let factor;
      if (verticalFactor !== 1 && verticalFactor < horizontalFactor) {
        factor = verticalFactor;
      }
      else {
        factor = horizontalFactor;
      }

      // Get the computed font size of the container, multiply it by the scaling factor,
      // and set it on the size wrapper element so that it will scale to fit its container.
      const scComputedFontSize = window.getComputedStyle(
        this.slideContainer,
        null,
      ).getPropertyValue('font-size');
      const scComputedFontSizeFloat = parseFloat(
        scComputedFontSize.replace('px', ''),
      );
      scSizeElement.style.fontSize = `${scComputedFontSizeFloat * factor}px`;

      // When the slide height is set, we can resize the imageContainers based on it and the size of
      // the rest of the slide contents.
      this.updateSlideImageContainersSize();

      // (Note: this only works because we use exclusively em and % units,
      // allowing elements to be resizeable by changing their font-size.
      // Anything defined in other units such as rem or px
      // will not scale with the rest of the slide.)
    }
  }

  render() {
    const { viewType, slide } = this.props;
    let slideContent;

    if (slide) {
      slideContent = this.props.slide.contentItemIds.map(id => (
        <ContentItemContainer
          key={id}
          contentItemId={id}
          slideId={slide.id}
          slideViewType={viewType}
          headingLevel={initialHeadingLevels[viewType]}
          ancestorItemIds={[]}
        />
      ));
    }
    else {
      slideContent = <p>Loading...</p>;
    }

    return (
      <div
        className={`c_slide-container c_slide-container--${this.props.cssIdentifier} ${this.props.isFullscreen
          ? 'c_slide-container--fullscreen'
          : ''}`}
        ref={(slideContainer) => {
          this.slideContainer = slideContainer;
        }}
      >
        <div className="c_slide-container__size">
          <div className="c_slide-container__wrapper">
            <div className="c_slide-container__content">
              <div
                className="ows_slide"
                data-slide-position={this.props.slideIndexInDeck + 1}
                data-slide-count={this.props.numberOfSlidesInDeck}
                data-level={this.props.slide.level}
              >
                <div className="ows_slide__overflow">
                  <div className="ows_slide__wrapper">
                    {slideContent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(viewType === slideViewTypes.NAVIGATION) &&
          <p>{this.props.slide.level}</p> /* #TODO visualize with indents instead of number */ }
      </div>
    );
  }
}

Slide.propTypes = {
  cssIdentifier: PropTypes.string,
  isFullscreen: PropTypes.bool,
  slide: PropTypes.shape(slideShape).isRequired,
  numberOfSlidesInDeck: PropTypes.number.isRequired,
  slideIndexInDeck: PropTypes.number.isRequired,
  viewType: PropTypes.oneOf(Object.values(slideViewTypes)).isRequired,
  // We need to connect these to force a rerender (and thus a resize)
  // when the active slide view types change.
  activeSlideViewTypes: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(slideViewTypes)),
  ).isRequired,
};

Slide.defaultProps = {
  cssIdentifier: 'default',
  isFullscreen: false,
  slide: null,
};

export default Slide;
