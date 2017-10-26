import { contentItemTypes } from 'constants/contentItemTypes';

import AsideDisplayWrapper from './aside/AsideDisplayWrapper';
import DecorativeImageDisplayWrapper from './decorative-image/DecorativeImageDisplayWrapper';
import IframeDisplayWrapper from './iframe/IframeDisplayWrapper';
import IllustrativeImageDisplayWrapper from './illustrative-image/IllustrativeImageDisplayWrapper';
import ImageContainerDisplayWrapper from './image-container/ImageContainerDisplayWrapper';
import ListDisplayWrapper from './list/ListDisplayWrapper';
import ListItemDisplayWrapper from './list-item/ListItemDisplayWrapper';
import ParagraphDisplayWrapper from './paragraph/ParagraphDisplayWrapper';
import SectionDisplayWrapper from './section/SectionDisplayWrapper';
import TitleDisplayWrapper from './title/TitleDisplayWrapper';

export default {
  [contentItemTypes.ASIDE]: AsideDisplayWrapper,
  [contentItemTypes.DECORATIVE_IMAGE]: DecorativeImageDisplayWrapper,
  [contentItemTypes.IFRAME]: IframeDisplayWrapper,
  [contentItemTypes.ILLUSTRATIVE_IMAGE]: IllustrativeImageDisplayWrapper,
  [contentItemTypes.IMAGE_CONTAINER]: ImageContainerDisplayWrapper,
  [contentItemTypes.LIST]: ListDisplayWrapper,
  [contentItemTypes.LIST_ITEM]: ListItemDisplayWrapper,
  [contentItemTypes.PARAGRAPH]: ParagraphDisplayWrapper,
  [contentItemTypes.SECTION]: SectionDisplayWrapper,
  [contentItemTypes.TITLE]: TitleDisplayWrapper,
};
