import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

// import EditorActivePane from '../../lib/reactContentBlock/EmphasizedText';

import { fetchSlides } from 'actions/fetchSlidesActions';
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
    activeDeck: state.data.activeDeck,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSlides }, dispatch);
}

// function Spayun(props){
//   return <span></span>
// }

/* class EditorActivePane extends Component {
  constructor(props) {
    super(props);
    this.state1 = 'state1';
    this.state2 = 'state2';
    this.state3 = 'state3';
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div contentEditable onInput={this.props.onChange}>
        <span value={this.state1} />
        <span value={this.state2} />
        <span value={this.state3} />
      </div>
    );
  }
}

EditorActivePane.propTypes = {
  onChange: PropTypes.func.isRequired,
};*/

/* const state = {
  state1: 'this is the first state',
  state2: 'this is more state',
};

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { editorState: state };
  }

  onChange(editorState) {
    console.log(editorState);
    this.setState({ editorState });
  }

  render() {
    return (
      <EditorActivePane
        onChange={this.onChange}
        editorState={this.state.editorState}
      />
    );
  }
}*/

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
