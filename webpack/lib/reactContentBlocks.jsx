import React from 'react';
import PropTypes from 'prop-types';
import Title from './reactContentBlock/Title';
// import EmphasizedText from './reactContentBlock/EmphasizedText';

function Subtitle(props) {
  return (
    <h1>
      {props.children}
    </h1>
  );
}
Subtitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

/* function Title(props) {
  return (
    <h1>
      {props.children}
    </h1>
  );
}
Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};*/

function EmphasizedText(props) {
  return (
    <em onChange={() => console.log('somethings gotta give')}>
      {props.children}
    </em>
  );
}
EmphasizedText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

function StrongText(props) {
  return (
    <em>
      {props.children}
    </em>
  );
}
StrongText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

function Slide(props) {
  return (
    <section>
      {props.children}
    </section>
  );
}

Slide.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};

const ReactContentBlocks = {
  Slide,
  Title,
  Subtitle,
  EmphasizedText,
  StrongText,
};

export default ReactContentBlocks;
