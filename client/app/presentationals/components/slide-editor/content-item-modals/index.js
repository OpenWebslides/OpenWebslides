import { contentItemTypes } from 'constants/contentItemTypes';

import IframeModal from './IframeModal';
import ImageModal from './ImageModal';

const modalTypes = {
  [contentItemTypes.ILLUSTRATIVE_IMAGE]: ImageModal,
  [contentItemTypes.IFRAME]: IframeModal,
};

export default modalTypes;
