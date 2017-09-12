import React from 'react';
import PropTypes from 'prop-types';
import { slideViewTypes } from 'constants/slideViewTypes';

import ContentViewItem from 'lib/content-item/view-items/content-view-item';

function SlideContentView(props) {
  if (props.slide !== null) {
    let slideContent;

    if (props.slide) {
      slideContent = props.slide.contentItemIds.map(id =>
        <ContentViewItem
          key={id}
          slideViewType={slideViewTypes.CONTENT}
          contentItemId={id}
          ancestorItemIds={[]}
          slideId={props.slide.id}
          headingLevel={1}
          editable={true}
        />,
      );
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
  slide: PropTypes.shape({
    id: PropTypes.string.isRequired,
    contentItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

SlideContentView.defaultProps = {
  cssIdentifier: 'default',
  slide: null,
};

export default SlideContentView;
