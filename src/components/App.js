import React from 'react';

import placeholder from '../images/placeholder.png';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <p>Minimal React, Webpack &amp; Babel setup! {process.env.API_URL}</p>
                <img src={placeholder} alt=""/>
            </div>
        )
    }
}