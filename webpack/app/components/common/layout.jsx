import React from 'react';
import PropTypes from 'prop-types';

function Layout(props) {
  return (
    <div className="app">
      <div className="app-header">
        <h1>HEADER</h1>
      </div>
      <section className="app-body">
        {props.children}
      </section>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
