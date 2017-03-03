import React from 'react';
import styles from './styles/application.scss';


class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { props };
  }

  render() {
    return <h1 className={styles.red}>Hello, World!</h1>;
  }
}

export default HelloWorld;
