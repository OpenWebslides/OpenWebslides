import React from 'react';
import PropTypes from 'prop-types';
import { slideViewTypes } from 'constants/slideViewTypes';

import { slideShape } from 'constants/propTypeShapes';
import { initialHeadingLevels } from 'constants/slideOptions';

import ContentViewItem from 'lib/content-item/view-items/content-view-item';

function SlideContentView(props) {
  if (props.slide !== null) {
    let slideContent;

    if (props.slide) {
      slideContent = props.slide.contentItemIds.map(id => (
        <ContentViewItem
          key={id}
          slideViewType={slideViewTypes.CONTENT}
          contentItemId={id}
          ancestorItemIds={[]}
          slideId={props.slide.id}
          headingLevel={initialHeadingLevels[slideViewTypes.CONTENT]}
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
