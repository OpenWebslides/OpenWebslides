import React from 'react';
import PropTypes from 'prop-types';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function Title(props) {
  if (props.active) {
    return (
      <h1>
        <ContentEditableContainer {...props} />
      </h1>
    );
  }
  return (
    <h1
      dangerouslySetInnerHTML={{
        __html: getHTMLStringFromInlinePropertiesAndText(props.contentItem.inlineProperties, props.contentItem.text),
      }}
    />
  );
}

Title.propTypes = {
  active: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

Title.defaultProps = {
  active: false,
};
