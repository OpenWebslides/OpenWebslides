import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes, slideViewTypesById } from 'constants/slideViewTypes';

import SlideViewsMenuContainer
  from 'containers/slide-editor/SlideViewsMenuContainer';

function SlideViewsPane(props) {
  let slideViewType;
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

          {_.values(slideViewTypes).map((slideViewTypeId) => {
            if (Array.indexOf(props.activeSlideViewTypes, slideViewTypeId) !== -1) {
              slideViewType = slideViewTypesById[slideViewTypeId];
              SlideViewComponent = slideViewType.component;
              return (
                <div className="c_slide-views-pane__views-item" key={slideViewTypeId}>
                  <SlideViewComponent />
                </div>
              );
            }
          })}
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
