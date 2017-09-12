import { contentItemTypes } from 'constants/contentItemTypes';

import AddIframeModal from './AddIframeModal';
import AddImageModal from './AddImageModal';

const modalTypes = {
  [contentItemTypes.ILLUSTRATIVE_IMAGE]: AddImageModal,
  [contentItemTypes.IFRAME]: AddIframeModal,
};

export default modalTypes;
