import _ from 'lodash';

const inlinePropertyTags = {
  EM: {
    startTag: '<em>',
    endTag: '</em>',
  },
  STRONG: {
    startTag: '<strong>',
    endTag: '</strong>',
  },
  LINK: {
    startTag: '<a target="_blank">',
    endTag: '</a>',
  },
  SUP: {
    startTag: '<sup>',
    endTag: '</sup>',
  },
  SUB: {
    startTag: '<sub>',
    endTag: '</sub>',
  },
};

export default function getHTMLStringFromInlinePropertiesAndText(
  inlineProperties,
  text,
  escape = true,
) {
  if (text === undefined || text === null) {
    return '';
  }

  // #TODO maybe this should be moved to a selector instead? (more efficient)
  let textHTML = '';

  // if there are no inlineproperties, just return the plain text
  if (
    inlineProperties === undefined ||
    inlineProperties === null ||
    inlineProperties.length === 0
  ) {
    textHTML = (escape) ? _.escape(text) : text;
  }
  // if there are inlineProperties, insert their HTML tags into the text
  else {
    // assume inlineproperties are sorted by startsAtChar
    // so we can just look at the next one every time a match is found
    // without having to loop the entire array every iteration
    let inlinePropertyIndex = 0;
    let inlineProperty = null;
    let charIndex = 0;

    // loop over all the chars of text
    // (+ 1 (because an inlineProperty can end after the last charindex)
    while (charIndex < text.length + 1) {
      // if there is a current inlineProperty (meaning: started but not yet ended)
      if (inlineProperty !== null) {
        // check if the current inline property ends at this charIndex
        if (inlineProperty.offsets.end === charIndex) {
          // if so, add the end tag to the HTML string
          textHTML += inlinePropertyTags[inlineProperty.type].endTag;
          // unset the current inline property
          inlineProperty = null;
        }
      }
      // if there is no current inlineProperty (because they can't overlap)
      // and there are unused inline properties left
      if (
        inlineProperty === null &&
        inlinePropertyIndex < inlineProperties.length
      ) {
        // check if the next inlineProperty starts at this charIndex
        if (inlineProperties[inlinePropertyIndex].offsets.start === charIndex) {
          // if so, save it as the current inlineProperty
          inlineProperty = inlineProperties[inlinePropertyIndex];
          // add its start tag to the HTML string

          if (!(_.isEmpty(inlineProperty.attributes))) {
            // Removes the '>' from the start tag so wee can append the attributes
            const openStartTag = inlinePropertyTags[inlineProperty.type].startTag.slice(0, -1);

            // maps over the attributes obj
            // and converts the properties to html attribute key value pairs
            const attributeString = Object
                .entries(inlineProperty.attributes)
                .map(([key, value]) => `${key}="${value}"`)
                .join(' ');

            // adds combined string to the textHTML string
            textHTML += `${openStartTag} ${attributeString}>`;
          }
          else {
            textHTML += inlinePropertyTags[inlineProperty.type].startTag;
          }

          // update the next inlineProperty index
          inlinePropertyIndex += 1;
        }
      }

      // add the current char to the HTML string
      textHTML += (escape) ? _.escape(text.charAt(charIndex)) : text.charAt(charIndex);

      // move to the next char
      charIndex += 1;
    }
  }

  return textHTML;
}
