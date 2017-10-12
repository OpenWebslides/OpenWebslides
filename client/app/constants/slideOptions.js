import { slideViewTypes } from 'constants/slideViewTypes';

// eslint-disable-next-line import/prefer-default-export
export const initialHeadingLevels = {
  [slideViewTypes.COURSE]: 1, // #TODO make sure this is actually used
  [slideViewTypes.LIVE]: 1,
  [slideViewTypes.CONTENT]: 1,
  [slideViewTypes.NAVIGATION]: 1,
  [slideViewTypes.PRESENTATION]: 1,
};
