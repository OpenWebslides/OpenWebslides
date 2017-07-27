import LiveTitle from 'lib/content-item/types/live/Title';
import LiveParagraph from 'lib/content-item/types/live/Paragraph';
import LiveSection from 'lib/content-item/types/live/Section';
import LiveAside from 'lib/content-item/types/live/Aside';
import LiveIframe from 'lib/content-item/types/live/Iframe';
import LiveImage from 'lib/content-item/types/live/Image';
import LiveList from 'lib/content-item/types/live/List';
import LiveListItem from 'lib/content-item/types/live/ListItem';

import ContentTitle from 'lib/content-item/types/content/Title';
import ContentParagraph from 'lib/content-item/types/content/Paragraph';
import ContentSection from 'lib/content-item/types/content/Section';
import ContentAside from 'lib/content-item/types/content/Aside';
import ContentIframe from 'lib/content-item/types/content/Iframe';
import ContentImage from 'lib/content-item/types/content/Image';
import ContentList from 'lib/content-item/types/content/List';
import ContentListItem from 'lib/content-item/types/content/ListItem';

// #TODO this doesn't work, probably because of a circular dependency; refactor
// import { slideViewTypes } from 'constants/slideViewTypes';

export const contentItemTypes = {
  TITLE: 'TITLE',
  PARAGRAPH: 'PARAGRAPH',
  LIST: 'LIST',
  LIST_ITEM: 'LIST_ITEM',
  ILLUSTRATIVE_IMAGE: 'ILLUSTRATIVE_IMAGE',
  DECORATIVE_IMAGE: 'DECORATIVE_IMAGE',
  IFRAME: 'IFRAME',
  SECTION: 'SECTION',
  ASIDE: 'ASIDE',
};

export const plaintextContentItemTypes = [
  contentItemTypes.TITLE,
  contentItemTypes.PARAGRAPH,
  contentItemTypes.LIST_ITEM,
];
export const sectionContentItemTypes = [
  contentItemTypes.SECTION,
  contentItemTypes.ASIDE,
];
export const containerContentItemTypes = [
  ...sectionContentItemTypes,
  contentItemTypes.LIST,
];

export const toolbarContentItemTypes = [
  {
    id: contentItemTypes.TITLE,
    key: contentItemTypes.TITLE,
    props: {},
  },
  {
    id: contentItemTypes.PARAGRAPH,
    key: contentItemTypes.PARAGRAPH,
    props: {},
  },
  {
    id: contentItemTypes.LIST,
    key: `UNORDERED_${contentItemTypes.LIST}`,
    props: {
      ordered: false,
    },
  },
  {
    id: contentItemTypes.LIST,
    key: `ORDERED_${contentItemTypes.LIST}`,
    props: {
      ordered: true,
    },
  },
  {
    id: contentItemTypes.ILLUSTRATIVE_IMAGE,
    key: contentItemTypes.ILLUSTRATIVE_IMAGE,
    props: {},
  },
  {
    id: contentItemTypes.IFRAME,
    key: contentItemTypes.IFRAME,
    props: {},
  },
];

export const contentItemTypesById = {
  [contentItemTypes.TITLE]: {
    id: contentItemTypes.TITLE,
    name: 'Title',
    description: 'TODO: title description',
    component: {
      LIVE: LiveTitle,
      CONTENT: ContentTitle,
    },
  },
  [contentItemTypes.PARAGRAPH]: {
    id: contentItemTypes.PARAGRAPH,
    name: 'Paragraph',
    description: 'TODO: paragraph description',
    component: {
      LIVE: LiveParagraph,
      CONTENT: ContentParagraph,
    },
  },
  [contentItemTypes.LIST]: {
    id: contentItemTypes.LIST,
    name: 'List',
    description: 'TODO: list description',
    component: {
      LIVE: LiveList,
      CONTENT: ContentList,
    },
  },
  [contentItemTypes.LIST_ITEM]: {
    id: contentItemTypes.LIST_ITEM,
    name: 'List item',
    description: 'TODO: list item description',
    component: {
      LIVE: LiveListItem,
      CONTENT: ContentListItem,
    },
  },
  [contentItemTypes.ILLUSTRATIVE_IMAGE]: {
    id: contentItemTypes.ILLUSTRATIVE_IMAGE,
    name: 'Illustrative image',
    description: 'TODO: illustrative image description',
    component: {
      LIVE: LiveImage,
      CONTENT: ContentImage,
    },
  },
  [contentItemTypes.DECORATIVE_IMAGE]: {
    id: contentItemTypes.DECORATIVE_IMAGE,
    name: 'Decorative image',
    description: 'TODO: decorative image description',
    component: {
      LIVE: LiveImage,
      CONTENT: ContentImage,
    },
  },
  [contentItemTypes.IFRAME]: {
    id: contentItemTypes.IFRAME,
    name: 'Iframe',
    description: 'TODO: iframe description',
    component: {
      LIVE: LiveIframe,
      CONTENT: ContentIframe,
    },
  },
  [contentItemTypes.SECTION]: {
    id: contentItemTypes.SECTION,
    name: 'Section',
    description: 'TODO: section description',
    component: {
      LIVE: LiveSection,
      CONTENT: ContentSection,
    },
  },
  [contentItemTypes.ASIDE]: {
    id: contentItemTypes.ASIDE,
    name: 'Aside',
    description: 'TODO: aside description',
    component: {
      LIVE: LiveAside,
      CONTENT: ContentAside,
    },
  },
};
