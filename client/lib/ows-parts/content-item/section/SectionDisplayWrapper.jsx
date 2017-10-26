import React from 'react';
import PropTypes from 'prop-types';

import { sectionContentItemShape } from 'constants/propTypeShapes';

import ContainerContentItemChildren
  from 'lib/content-item-container/content-item-contents/ContainerContentItemChildren';

function SectionDisplayWrapper(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <section
      className="ows_section"
      {...attributes}
    >
      <ContainerContentItemChildren
        contentItem={contentItem}
        {...passThroughProps}
      />
    </section>
  );
}

SectionDisplayWrapper.propTypes = {
  contentItem: PropTypes.shape(sectionContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SectionDisplayWrapper;
