import React from 'react';
import PropTypes from 'prop-types';

import { titleContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents
  from 'lib/content-item-container/content-item-contents/ContentItemInnerContents';

function TitleDisplayWrapper(props) {
  const { contentItem, attributes, headingLevel, ...passThroughProps } = props;
  const Heading = `h${Math.min(headingLevel, 6)}`;

  return (
    <Heading
      className="ows_title"
      {...attributes}
    >
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

TitleDisplayWrapper.propTypes = {
  contentItem: PropTypes.shape(titleContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  headingLevel: PropTypes.number.isRequired,
};

export default TitleDisplayWrapper;
