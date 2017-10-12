import React from 'react';
import PropTypes from 'prop-types';

import { titleContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents from '../content-item-contents/ContentItemInnerContents';

function Title(props) {
  const { contentItem, attributes, headingLevel, ...passThroughProps } = props;
  const Heading = `h${Math.min(headingLevel, 6)}`;

  return (
    <Heading {...attributes}>
      <ContentItemInnerContents
        contentItem={contentItem}
        {...passThroughProps}
        textPropOptions={[{
          textPropTitle: '',
          textPropName: 'text',
          hasInlineProperties: true,
          deleteOnBackspace: true,
        }]}
      />
    </Heading>
  );
}

Title.propTypes = {
  contentItem: PropTypes.shape(titleContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  headingLevel: PropTypes.number.isRequired,
};

export default Title;
