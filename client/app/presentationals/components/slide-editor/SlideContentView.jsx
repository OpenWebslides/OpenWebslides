import React from 'react';
import PropTypes from 'prop-types';
import { slideViewTypes } from 'constants/slideViewTypes';

import { slideShape } from 'constants/propTypeShapes';
import { initialHeadingLevels } from 'constants/slideOptions';

import ContentItemContainer from 'lib/content-item-container/ContentItemContainer';

function SlideContentView(props) {
  if (props.slide !== null) {
    const viewType = slideViewTypes.CONTENT;
    let slideContent;

    if (props.slide) {
      slideContent = props.slide.contentItemIds.map(id => (
        <ContentItemContainer
          key={id}
          contentItemId={id}
          slideId={props.slide.id}
          slideViewType={viewType}
          headingLevel={initialHeadingLevels[viewType]}
          ancestorItemIds={[]}
        />));
    }
    else {
      slideContent = <p>Loading...</p>;
    }

    return (
      <div
        className={`c_slide-content-view c_slide-content-view--${props.cssIdentifier}`}
      >
        <div className="c_slide-content-view__wrapper">
          {slideContent}
        </div>
      </div>
    );
  }

  return <h1>Loading...</h1>;
}

SlideContentView.propTypes = {
  cssIdentifier: PropTypes.string,
  slide: PropTypes.shape(slideShape),
};

SlideContentView.defaultProps = {
  cssIdentifier: 'default',
  slide: null,
};

export default SlideContentView;
