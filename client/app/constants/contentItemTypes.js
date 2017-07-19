import Title from 'lib/content-item/types/Title';
import Paragraph from 'lib/content-item/types/Paragraph';
import Section from 'lib/content-item/types/Section';
import Aside from 'lib/content-item/types/Aside';
import Iframe from 'lib/content-item/types/Iframe';
import Image from 'lib/content-item/types/Image';
import List from 'lib/content-item/types/List';
import ListItem from 'lib/content-item/types/ListItem';

export const contentItemTypes = {
  TITLE: 'TITLE',
  PARAGRAPH: 'PARAGRAPH',
  LIST: 'LIST',
  LIST_ITEM: 'LIST_ITEM',
  IMAGE: 'IMAGE',
  IFRAME: 'IFRAME',
  SECTION: 'SECTION',
  ASIDE: 'ASIDE',
};

export const contentItemTypesById = {
  [contentItemTypes.TITLE]: {
    id: contentItemTypes.TITLE,
    component: Title,
    name: 'Title',
    description: 'TODO: title description',
    inToolbar: true,
  },
  [contentItemTypes.PARAGRAPH]: {
    id: contentItemTypes.PARAGRAPH,
    component: Paragraph,
    name: 'Paragraph',
    description: 'TODO: paragraph description',
    inToolbar: true,
  },
  [contentItemTypes.LIST]: {
    id: contentItemTypes.LIST,
    component: List,
    name: 'List',
    description: 'TODO: list description',
    inToolbar: true,
  },
  [contentItemTypes.LIST_ITEM]: {
    id: contentItemTypes.LIST_ITEM,
    component: ListItem,
    name: 'List item',
    description: 'TODO: list item description',
    inToolbar: false,
  },
  [contentItemTypes.IMAGE]: {
    id: contentItemTypes.IMAGE,
    component: Image,
    name: 'Image',
    description: 'TODO: image description',
    inToolbar: true,
  },
  [contentItemTypes.IFRAME]: {
    id: contentItemTypes.IFRAME,
    component: Iframe,
    name: 'Iframe',
    description: 'TODO: iframe description',
    inToolbar: true,
  },
  [contentItemTypes.SECTION]: {
    id: contentItemTypes.SECTION,
    component: Section,
    name: 'Section',
    description: 'TODO: section description',
    inToolbar: false,
  },
  [contentItemTypes.ASIDE]: {
    id: contentItemTypes.ASIDE,
    component: Aside,
    name: 'Aside',
    description: 'TODO: aside description',
    inToolbar: false,
  }
};
