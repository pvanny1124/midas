import React from 'react';

const DisplayField = props => (
    <div className={props.style}>
        <span className="display-field-key">{props.d_key}</span> 
        {
            props.value && 
            <span className="display-field-value">{props.value}</span>
        }
    </div>
)

export default DisplayField;