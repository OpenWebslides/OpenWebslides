import React from 'react';
import PropTypes from 'prop-types';

function ToolbarButton(props) {
  const key = props.button.key.toLowerCase().replace('_', '-');

  return (
    <span
      className={`c_toolbar-button c_toolbar-button--${props.cssIdentifier} c_toolbar-button--id_${key}`}
    >
      <button
        className={'c_toolbar-button__widget o_button'}
        title={props.button.title !== undefined
          ? props.button.title
          : props.button.text}
        onClick={props.onClick}
      >
        <span
          className="c_toolbar-button__widget__wrapper o_button__wrapper o_action__wrapper"
        >
          {props.button.text}
        </span>
      </button>
    </span>
  );
}

ToolbarButton.propTypes = {
  cssIdentifier: PropTypes.string,
  button: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

ToolbarButton.defaultProps = {
  cssIdentifier: 'default',
};

export default ToolbarButton;
