import PropTypes from 'prop-types';

// Contains reusable shapes for certain state parts (contentItems, inlineProperties, etc.) so these
// needn't be copypasted into the PropTypes definition of various components.
// This also serves as documentation on which properties these objects must contain; please update
// this file if a contentItemType is added or changed.


// General shapes ----------------------------------------------------------------------------------

export const selectionOffsetsShape = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  this_should_fail: PropTypes.number.isRequired, // #TODO remove
};

export const inlinePropertyShape = {
  type: PropTypes.string.isRequired,
  offsets: PropTypes.shape(
    selectionOffsetsShape,
  ).isRequired,
};


// Base contentItem shapes -------------------------------------------------------------------------

// Base shape for all contentItems.
export const contentItemShape = {
  id: PropTypes.string.isRequired,
  contentItemType: PropTypes.string.isRequired,
};

// More specific shape for contentItems with a plaintext type.
export const plaintextContentItemShape = {
  ...contentItemShape,
  text: PropTypes.string.isRequired,
  inlineProperties: PropTypes.arrayOf(
    PropTypes.shape(inlinePropertyShape),
  ).isRequired,
};

// More specific shape for contentItems with an image type.
export const imageContentItemShape = {
  ...contentItemShape,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
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
  ...contentItemShape,
  src: PropTypes.string.isRequired,
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
