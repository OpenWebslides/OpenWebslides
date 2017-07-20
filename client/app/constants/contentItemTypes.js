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
  ILLUSTRATIVE_IMAGE: 'ILLUSTRATIVE_IMAGE',
  DECORATIVE_IMAGE: 'DECORATIVE_IMAGE',
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
  [contentItemTypes.ILLUSTRATIVE_IMAGE]: {
    id: contentItemTypes.ILLUSTRATIVE_IMAGE,
    component: Image,
    name: 'IllustrativeImage',
    description: 'TODO: illustrative image description',
    inToolbar: true,
  },
  [contentItemTypes.DECORATIVE_IMAGE]: {
    id: contentItemTypes.DECORATIVE_IMAGE,
    component: Image,
    name: 'DecorativeImage',
    description: 'TODO: Decorative image description',
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
