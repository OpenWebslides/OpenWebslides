import React from 'react';
import SlideLiveViewContainer from 'containers/slide-editor/SlideLiveViewContainer';
import SlideDebugViewContainer from 'containers/slide-editor/SlideDebugViewContainer';

export const slideViewTypes = {
  DEBUG: 'DEBUG',
  CONTENT: 'CONTENT',
  LIVE: 'LIVE',
};

export const slideViewTypesById = {
  [slideViewTypes.DEBUG]: {
    id: slideViewTypes.DEBUG,
    name: 'Debug view',
    component: SlideDebugViewContainer,
  },
  [slideViewTypes.CONTENT]: {
    id: slideViewTypes.CONTENT,
    name: 'Content view',
    component: SlideDebugViewContainer,
  },
  [slideViewTypes.LIVE]: {
    id: slideViewTypes.LIVE,
    name: 'Live view',
    component: SlideLiveViewContainer,
  },
};
