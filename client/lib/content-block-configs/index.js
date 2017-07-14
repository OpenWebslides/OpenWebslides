import contentItemTypes from 'constants/contentItemTypes';

import Title from './Title';
import Paragraph from './Paragraph';
import Section from './Section';
import Aside from './Aside';
import Iframe from './Iframe';
import Image from './Image';
import List from './List';
import ListItem from './ListItem';

export default {
  [contentItemTypes.TITLE]: Title,
  [contentItemTypes.PARAGRAPH]: Paragraph,
  [contentItemTypes.SECTION]: Section,
  [contentItemTypes.ASIDE]: Aside,
  [contentItemTypes.IFRAME]: Iframe,
  [contentItemTypes.LIST]: List,
  [contentItemTypes.LIST_ITEM]: ListItem,
  [contentItemTypes.IMAGE]: Image,
};
