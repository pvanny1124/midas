import React, { Component } from 'react';
import { Select } from 'semantic-ui-react';


class SelectRange extends Component {


    render() {
        return (
            <div>
                <nav>
                    <a>1d</a>
                    <a>1w</a>
                    <a>1m</a>
                    <a>3m</a>
                    <a>1y</a>
                    <a>5y</a>
                </nav>
            </div>
        );
    }
}

export default SelectRange;