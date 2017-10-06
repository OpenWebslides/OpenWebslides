import PropTypes from 'prop-types';

import { contentItemTypes } from 'constants/contentItemTypes';
import { inlinePropertyTypes } from 'constants/inlinePropertyTypes';

// Contains reusable shapes for certain state parts (contentItems, inlineProperties, etc.) so these
// needn't be copypasted into the PropTypes definition of various components.
// This also serves as documentation on which properties these objects must contain; please update
// this file if a contentItemType is added or changed.


// General shapes ----------------------------------------------------------------------------------

export const selectionOffsetsShape = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};

export const inlinePropertyShape = {
  type: PropTypes.oneOf(Object.values(inlinePropertyTypes)).isRequired,
  offsets: PropTypes.shape(
    selectionOffsetsShape,
  ).isRequired,
};

export const slideShape = {
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  contentItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  contentItemSequence: PropTypes.number.isRequired,
};


// Base contentItem shapes -------------------------------------------------------------------------

// Base shape for all contentItems.
export const contentItemShape = {
  id: PropTypes.string.isRequired,
  contentItemType: PropTypes.oneOf(Object.values(contentItemTypes)).isRequired,
};

// More specific shape for contentItems with a plaintext type.
export const plaintextContentItemShape = {
  ...contentItemShape,
  text: PropTypes.string.isRequired,
  inlineProperties: PropTypes.arrayOf(PropTypes.shape(inlinePropertyShape)).isRequired,
};

// More specific shape for contentItems with media type.
// #TODO later this should include video, etc.
export const mediaContentItemShape = {
  ...contentItemShape,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

// More specific shape for contentItems with an image type.
export const imageContentItemShape = {
  ...mediaContentItemShape,
};

// More specific shape for contentItems with a container type.
export const containerContentItemShape = {
  ...contentItemShape,
  childItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// More specific shape for contentItems with a sectioning type.
export const sectioningContentItemShape = {
  ...containerContentItemShape,
};


// Specific contentItem shapes (one for each contentItemType) --------------------------------------

export const titleContentItemShape = {
  ...plaintextContentItemShape,
};

export const paragraphContentItemShape = {
  ...plaintextContentItemShape,
};

export const listItemContentItemShape = {
  ...plaintextContentItemShape,
};

export const illustrativeImageContentItemShape = {
  ...imageContentItemShape,
  caption: PropTypes.string.isRequired,
};

export const decorativeImageContentItemShape = {
  ...imageContentItemShape,
};

export const iframeContentItemShape = {
  ...mediaContentItemShape,
};

export const sectionContentItemShape = {
  ...sectioningContentItemShape,
};

export const asideContentItemShape = {
  ...sectioningContentItemShape,
};

export const listContentItemShape = {
  ...containerContentItemShape,
  ordered: PropTypes.bool.isRequired,
};

export const imageContainerContentItemShape = {
  ...containerContentItemShape,
  imageType: PropTypes.string.isRequired,
};
