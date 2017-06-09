import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchSlides } from 'actions/slideActions';
import parseDeckObject from '../../lib/parseDeckObject';

class Editor extends Component {
  componentDidMount() {
    const id = 1;
    this.props.fetchSlides(id);
  }

  render() {
    const { activeDeck } = this.props;

    if (!_.isEmpty(activeDeck)) {
      const slideComponentArray = parseDeckObject(activeDeck);
      return (
        <div>
          <h3>Title: {activeDeck.meta.title}</h3>
          <h3>Description: {activeDeck.meta.description}</h3>
          <h3>Slides:</h3>
          {slideComponentArray}
        </div>
      );
    }

    return <div>Loading...</div>;
  }
}

Editor.propTypes = {
  fetchSlides: PropTypes.func.isRequired,
  activeDeck: PropTypes.objectOf(Object),
};

Editor.defaultProps = {
  activeDeck: null,
};

function mapStateToProps(state) {
  return {
    activeDeck: state.entities.deck,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSlides }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
