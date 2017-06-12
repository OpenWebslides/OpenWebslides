import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NavMenu from 'presentationals/components/shared/NavMenu';

function PageHeader(props) {
  // Define logo content in separate variable so it can be included in
  // logoContainer.
  const logoContent = (
    <span className="o_logo__wrapper">
      <Link className="o_logo__link" to="/">
        <span className="o_logo__text">
          <span className="o_logo__text__wrapper">
            <span className="o_logo__item o_logo__item--open">
              Open
            </span>
            <span className="o_logo__item o_logo__item--webslides">
              Webslides
            </span>
          </span>
        </span>
      </Link>
    </span>
  );
  // Use a different container tag for logo content depending on the value of
  // props.isHeading. (Reason: we might want the logo to be a <h1> on the
  // homepage only; adding this functionality just in case.)
  let logoContainer;
  if (props.logoIsHeading) {
    logoContainer = (
      <h1 className="o_logo o_logo--site">
        {logoContent}
      </h1>
    );
  } else {
    logoContainer = (
      <p className="o_logo o_logo--site">
        {logoContent}
      </p>
    );
  }

  return (
    <header className={`c_page-header c_page-header--${props.cssIdentifier}`}>
      <div className="c_page-header__wrapper">
        <div className="c_page-header__item c_page-header__item--logo">
          {logoContainer}
        </div>
        <div className="c_page-header__item c_page-header__item--menu">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}

PageHeader.propTypes = {
  cssIdentifier: PropTypes.string,
  logoIsHeading: PropTypes.bool,
};

PageHeader.defaultProps = {
  cssIdentifier: 'default',
  logoIsHeading: false,
};

export default PageHeader;
