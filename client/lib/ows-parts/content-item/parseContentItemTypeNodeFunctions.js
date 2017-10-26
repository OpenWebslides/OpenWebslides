import parseAside from './aside/parseAside';
import parseDecorativeImage from './decorative-image/parseDecorativeImage';
import parseIframe from './iframe/parseIframe';
import parseIllustrativeImage from './illustrative-image/parseIllustrativeImage';
import parseImageContainer from './image-container/parseImageContainer';
import parseList from './list/parseList';
import parseListItem from './list-item/parseListItem';
import parseParagraph from './paragraph/parseParagraph';
import parseSection from './section/parseSection';
import parseTitle from './title/parseTitle';
import parsePassThroughContainer from '../helpers/parsePassThroughContainer';

export default [
  parseAside,
  parseDecorativeImage,
  parseIframe,
  parseIllustrativeImage,
  parseImageContainer,
  parseList,
  parseListItem,
  parseParagraph,
  parseSection,
  parseTitle,
  parsePassThroughContainer,
];
