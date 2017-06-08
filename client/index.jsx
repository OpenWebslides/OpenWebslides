import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('react-container'),
  );
}

render(App);

if (module.hot) {
  module.hot.accept(App, () => {
    render(App);
  });
}
