import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from 'history';
import { imgOptions, iframeOptions } from 'constants/printViewOptions';
import SelectImageOptions from './SelectImageOptions';
import SelectIframeOptions from './SelectIframeOptions';
import SelectDecorativeImageOptions from './SelectDecorativeImageOptions';
import SelectAnnotationsOprions from './SelectAnnotationsOptions';


class PrintViewToolbar extends Component {

  constructor(props) {
    super(props);
    this.handlePrintShortcut = this.handlePrintShortcut.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handlePrintShortcut);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePrintShortcut);
  }

  handlePrintShortcut(e) {
    // debugger;
    const id = this.props.id;
    if (e.keyCode === 80 && (e.metaKey || e.ctrlKey)) {
      console.log('shortcut detected');
      e.preventDefault();
      history.push(`/printOnly/${id}`);
    }
  }

  render() {
    const { printViewState, changeImagePref, changeIframePref, changeDecorativeImagePref, id } = this.props;
    const curImagePref = printViewState.images;

    const curDecorativeImagePref = printViewState.decorativeImages;
    const curIframePref = printViewState.iframes;
    return (
      <div className="c_print-view-toolbar">
        <SelectImageOptions changeImagePref={changeImagePref} selectedImagePref={curImagePref} />
        <SelectIframeOptions changeIframePref={changeIframePref} selectedIframePref={curIframePref} />
        <SelectDecorativeImageOptions
          changeDecorativeImagePref={changeDecorativeImagePref}
          selectedDecorativeImagePref={curDecorativeImagePref}
        />
        <Link to={`/printOnly/${id}`}> Print </Link>
      </div>
    );
  }
}

PrintViewToolbar.propTypes = {
  changeImagePref: PropTypes.func.isRequired,
  changeIframePref: PropTypes.func.isRequired,
  changeDecorativeImagePref: PropTypes.func.isRequired,
  changeAnnotationsPref: PropTypes.func.isRequired,
  printViewState: PropTypes.shape({
    images: PropTypes.oneOf(Object.keys(imgOptions)),
    iframes: PropTypes.oneOf(Object.keys(iframeOptions)),
    annotations: 'INLINE',
    decorativeImages: PropTypes.bool,
  }),
  id: PropTypes.number.isRequired,
};

PrintViewToolbar.defaultProps = {
  printViewState: {
    images: 'IMAGES_AND_TEXT',
    iframes: 'DESCRIPTION',
    annotations: 'INLINE',
    decorativeImages: false,
  },
};

export default PrintViewToolbar;
