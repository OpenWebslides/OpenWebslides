import SlideLiveViewContainer
  from 'containers/slide-editor/SlideLiveViewContainer';
import SlideContentViewContainer
  from 'containers/slide-editor/SlideContentViewContainer';
import SlideDebugViewContainer
  from 'containers/slide-editor/SlideDebugViewContainer';

export const slideViewTypes = {
  DEBUG: 'DEBUG',
  CONTENT: 'CONTENT',
  COURSE: 'COURSE',
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
    component: SlideContentViewContainer,
  },
  [slideViewTypes.LIVE]: {
    id: slideViewTypes.LIVE,
    name: 'Live view',
    component: SlideLiveViewContainer,
  },
};
