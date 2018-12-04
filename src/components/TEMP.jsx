<div className="welcome-component">
        <row className="welcome-info col-md-7">
            <h1><strong>Welcome to Midas</strong></h1>
            <Media className={"welcome-bullets"}>
    
                <div className="welcome-bullet-item">
                    <Media.Left>
                        <FontAwesomeIcon icon={faChartLine} size={"4x"} color={"springgreen"}/>
                    </Media.Left>
                    <Media.Body>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsum quaerat eaque est aliquid doloremque dignissimos consectetur veniam eligendi. Molestiae asperiores labore ipsa hic deleniti adipisci numquam rerum nesciunt quis.</p>
                    </Media.Body>
                </div>
    
                <div className="welcome-bullet-item">
                    <Media.Left>
                        <FontAwesomeIcon icon={faHandHoldingUsd} size={"4x"} color={"orange"} />
                    </Media.Left>
                    <Media.Body>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, consectetur animi tenetur ut earum et dolorem laudantium officiis incidunt mollitia corporis eaque eligendi dolores delectus inventore cumque doloremque rerum officia.</p>
                    </Media.Body>
                </div>
    
                <div className="welcome-bullet-item">
                    <Media.Left>
                        
                        <FontAwesomeIcon icon={faCommentsDollar} size={"4x"} color={"steelblue"} />
                    </Media.Left>
                    <Media.Body>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, consectetur animi tenetur ut earum et dolorem laudantium officiis incidunt mollitia corporis eaque eligendi dolores delectus inventore cumque doloremque rerum officia.</p>
                    </Media.Body>
                </div>
    
            </Media>
            
            
            <Link to="/about">
                <Button bsStyle="primary"> Click to Learn more </Button>
            </Link>
        </row>
        <div class="welcome-chart">
            <Chart stockName="aapl" range="1m" />
        </div>
    </div>