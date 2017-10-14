import React from 'react';
import PropTypes from 'prop-types';

import { asideContentItemShape } from 'constants/propTypeShapes';

import ContainerContentItemChildren from '../content-item-contents/ContainerContentItemChildren';

function Aside(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <aside
      className="ows_aside"
      {...attributes}
    >
      <ContainerContentItemChildren
        contentItem={contentItem}
        {...passThroughProps}
      />
    </aside>
  );
}

Aside.propTypes = {
  contentItem: PropTypes.shape(asideContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Aside;
