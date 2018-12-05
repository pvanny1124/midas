import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Price = props => (
    <div className="price">
        <div className="stock-info-price">
            {
                props.price &&
                <h2>${props.price}</h2>
            }
        </div>
        <div className="stock-info-week52Limits">
            {
                props.w52high &&
                <div class="week-52-high">
                    ${props.w52high}
                    <FontAwesomeIcon icon={faArrowUp} size={"lg"} color={"#29a329"} />
                </div> 
            }
            
            {
                props.w52low &&
                <div class="week-52-low">
                    ${props.w52low}
                    <FontAwesomeIcon icon={faArrowDown} size={"lg"} color={"#b83535"} />
                </div>
            }
        </div>
    </div>
)

export default Price;