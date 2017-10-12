import { contentItemTypes } from 'constants/contentItemTypes';

import Aside from './Aside';
import DecorativeImage from './DecorativeImage';
import Iframe from './Iframe';
import IllustrativeImage from './IllustrativeImage';
import ImageContainer from './ImageContainer';
import List from './List';
import ListItem from './ListItem';
import Paragraph from './Paragraph';
import Section from './Section';
import Title from './Title';

export default {
  [contentItemTypes.ASIDE]: Aside,
  [contentItemTypes.DECORATIVE_IMAGE]: DecorativeImage,
  [contentItemTypes.IFRAME]: Iframe,
  [contentItemTypes.ILLUSTRATIVE_IMAGE]: IllustrativeImage,
  [contentItemTypes.IMAGE_CONTAINER]: ImageContainer,
  [contentItemTypes.LIST]: List,
  [contentItemTypes.LIST_ITEM]: ListItem,
  [contentItemTypes.PARAGRAPH]: Paragraph,
  [contentItemTypes.SECTION]: Section,
  [contentItemTypes.TITLE]: Title,
};
