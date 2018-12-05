import React from 'react';
import {Link} from 'react-router-dom';
import { Media, Button } from 'react-bootstrap';
import Chart from './Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHandHoldingUsd, faCommentsDollar } from '@fortawesome/free-solid-svg-icons';

const Welcome = () => (
    <div className={"welcome-component"}>
        <div className={"welcome-info"}>
            <h1><strong>Welcome to Midas</strong></h1>
            <Media className={"welcome-bullets"}>
    
                <div className={"welcome-bullet-item"}>
                    <Media.Left>
                        <FontAwesomeIcon icon={faChartLine} size={"4x"} color={"mediumseagreen"}/>
                    </Media.Left>
                    <Media.Body>
                        <p>Get started with the stock market using our simulator</p>
                    </Media.Body>
                </div>
    
                <div className={"welcome-bullet-item"}>
                    <Media.Left>
                        <FontAwesomeIcon icon={faHandHoldingUsd} size={"4x"} color={"orange"} />
                    </Media.Left>
                    <Media.Body>
                        <p>Use fake currency we keep track of for you to practice investing in the stock market</p>
                    </Media.Body>
                </div>
    
                <div className={"welcome-bullet-item"}>
                    <Media.Left>
                        
                        <FontAwesomeIcon icon={faCommentsDollar} size={"4x"} color={"steelblue"} />
                    </Media.Left>
                    <Media.Body>
                        <p>Chat and message with friends to learn the tricks of the trade</p>
                    </Media.Body>
                </div>
    
            </Media>
            
            
            <Link to={"/signup"}>
                <Button className={"welcome-button"} bsStyle={"primary"}> Sign Up Today </Button>
            </Link>
        </div>
        <div class={"welcome-chart"}>
            <Chart stockName={"msft"} range={"1m"} />
        </div>
    </div>
)

export default Welcome;