import React from 'react';
import PropTypes from 'prop-types';

import { sectionContentItemShape } from 'constants/propTypeShapes';

import ContainerContentItemChildren from '../content-item-contents/ContainerContentItemChildren';

function Section(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <section {...attributes} >
      <ContainerContentItemChildren
        contentItem={contentItem}
        {...passThroughProps}
      />
    </section>
  );
}

Section.propTypes = {
  contentItem: PropTypes.shape(sectionContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Section;
