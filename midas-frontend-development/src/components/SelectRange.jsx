import React from 'react';


const SelectRange = (props) => (
    <div>
        <nav className="range-switch">
            <a onClick={props.setChartRange}>1d</a>
            <a onClick={props.setChartRange}>1w</a>
            <a onClick={props.setChartRange}>1m</a>
            <a onClick={props.setChartRange}>3m</a>
            <a onClick={props.setChartRange}>1y</a>
            <a onClick={props.setChartRange}>5y</a>
        </nav>
    </div>
)


export default SelectRange;