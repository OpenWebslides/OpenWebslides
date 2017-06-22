import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavigationPane from 'containers/slide-editor/NavigationContainer';
import EditingPane from 'presentationals/components/editor/EditingPane';

export default class Editor extends Component {
  componentDidMount() {
    this.props.fetchSlides(1);
  }

  render() {
    return (
      <main className="l_main">
        <div className="l_main__wrapper">
          <div className="l_main__item l_main__item--deck-navigator">
            <div className="l_main__item__wrapper">
              <NavigationPane />
            </div>
          </div>
          <div className="l_main__item l_main__item--slide-editor">
            <div className="l_main__item__wrapper">
              <EditingPane />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

Editor.propTypes = {
  fetchSlides: PropTypes.func.isRequired,
};
