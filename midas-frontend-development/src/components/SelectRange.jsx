import React, { Component } from 'react';
import { Select } from 'semantic-ui-react';


class SelectRange extends Component {

    switchGraph(event){
        this.props.setGraphRange(event.currentTarget.textContent);
    }

    render() {
        return (
            <div>
                <nav className="range-switch">
                    <a onClick={(event) => this.switchGraph(event)}>1d</a>
                    <a onClick={(event) => this.switchGraph(event)}>1w</a>
                    <a onClick={(event) => this.switchGraph(event)}>1m</a>
                    <a onClick={(event) => this.switchGraph(event)}>3m</a>
                    <a onClick={(event) => this.switchGraph(event)}>1y</a>
                    <a onClick={(event) => this.switchGraph(event)}>5y</a>
                </nav>
            </div>
        );
    }
}

export default SelectRange;