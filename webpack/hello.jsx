import React from 'react'
import styles from './styles/application.scss';


var HelloWorld = React.createClass({
    render: function() {
        return <h1 className={ styles.red }>Hello, World!</h1>;
    }
});

export default HelloWorld;