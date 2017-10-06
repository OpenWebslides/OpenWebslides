import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes } from 'constants/slideViewTypes';

import SlideViewsMenuContainer
  from 'containers/slide-editor/SlideViewsMenuContainer';

import SlideLiveViewContainer from 'containers/slide-editor/SlideLiveViewContainer';
import SlideContentViewContainer from 'containers/slide-editor/SlideContentViewContainer';
import SlideDebugViewContainer from 'containers/slide-editor/SlideDebugViewContainer';

const slideViewComponents = {
  [slideViewTypes.DEBUG]: SlideDebugViewContainer,
  [slideViewTypes.CONTENT]: SlideContentViewContainer,
  [slideViewTypes.LIVE]: SlideLiveViewContainer,
};

function SlideViewsPane(props) {
  let SlideViewComponent;

  return (
    <div
      className={`c_slide-views-pane c_slide-views-pane--${props.cssIdentifier}`}
    >
      <div className="c_slide-views-pane__wrapper">
        <div className="c_slide-views-pane__switcher">
          <SlideViewsMenuContainer />
        </div>
        <div className="c_slide-views-pane__views-list">

          {_.values(slideViewTypes)
            .filter((slideViewTypeId) => {
              return _.indexOf(props.activeSlideViewTypes, slideViewTypeId) !== -1;
            })
            .map((slideViewTypeId) => {
              SlideViewComponent = slideViewComponents[slideViewTypeId];
              return (
                <div className="c_slide-views-pane__views-item" key={slideViewTypeId}>
                  <SlideViewComponent />
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

SlideViewsPane.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlideViewTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SlideViewsPane.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideViewsPane;
