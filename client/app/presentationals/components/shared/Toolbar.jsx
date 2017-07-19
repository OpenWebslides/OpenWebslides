import React from "react";
import PropTypes from "prop-types";

import ToolbarButton from "./ToolbarButton";

function Toolbar(props) {
  return (
    <div className={ "c_toolbar c_toolbar--" + props.cssIdentifier }>
      <div className="c_toolbar__wrapper">
        <menu className="c_toolbar__list o_list">
          { props.buttons.map( button => (
            <li className="c_toolbar__item o_list__item"
                key={ button.actionCode }>
              <div className="c_toolbar__item__wrapper o_list__item__wrapper">
                <ToolbarButton cssIdentifier={ props.cssIdentifier }
                               button={button}
                               onClick={ () => props.onButtonClick(button) }
                />
              </div>
            </li>
          ))}
        </menu>
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  cssIdentifier: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string,
    actionCode: PropTypes.string.isRequired,
    onClickArguments: PropTypes.object,
  })).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

Toolbar.defaultProps = {
  cssIdentifier: 'default',
};

export default Toolbar;