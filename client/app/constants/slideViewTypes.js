export const slideViewTypes = {
  DEBUG: 'DEBUG',
  CONTENT: 'CONTENT',
  COURSE: 'COURSE',
  LIVE: 'LIVE',
  NAVIGATION: 'NAVIGATION',
  PRESENTATION: 'PRESENTATION',
  SAVE: 'SAVE',
};

export const slideViewTypesById = {
  [slideViewTypes.DEBUG]: {
    id: slideViewTypes.DEBUG,
    name: 'Debug view',
  },
  [slideViewTypes.CONTENT]: {
    id: slideViewTypes.CONTENT,
    name: 'Content view',
  },
  [slideViewTypes.LIVE]: {
    id: slideViewTypes.LIVE,
    name: 'Live view',
  },
};
