debugger;

//need express to build RESTful API
const express           = require("express");

//Need http to create our socket server
const http              = require("http");

//Need socketIO for real-time quote streaming
const socketIo          = require("socket.io");

//Give app express methods
const app               = express();

//require controllers to handle routing
const controllers       = require('./controllers');

//require models to synx database
const models            = require('./models');

//need cookie-parser to setup passport middleware
const cookieParser      = require('cookie-parser');

//need express-session to setup passport middleware to track user session
const expressSession    = require('express-session');

//require passport to setup basic middleware configuration
const passport          = require('./middlewares/auth');

//need request-promise to webscrape together with cheerio
const rp                = require('request-promise');
const cheerio           = require('cheerio');

//use cli-table to display tabular data
const Table             = require('cli-table');

//require User schema
const Users             = require('./models/users');

//need bodyParser to process form data
const bodyParser        = require('body-parser');

//require iex trading helpers
const iextrading        = require('../midas-frontend-development/src/helpers/interactions/iex_interactions');

//need redis for caching in memory
const redis             = require('redis');

//Need xmldom to parse string to XML format
const DOMParser         = require('xmldom').DOMParser;


const util              = require('util');

//use eyes to color code and format console json output
const inspect           = require('eyes').inspector({maxLength: false});

//need the child process exec method to run curl command to get market status
const exec              = require('child_process').exec;

//need xml2js parse XML to json
const parseString       = require('xml2js').parseString;

//test connection with pg
const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.HEROKU_POSTGRESQL_GOLD_URL,
//   ssl: true,
// });

// client.connect();

//if not in heroku environment, then use port 3000
const PORT = process.env.PORT || 3000;


//start webscraping from here

var text, parser, xmlDoc;
parser = new DOMParser();

// const command = "curl \"http://wu-quotes.apple.com/dgw?imei=42&apptype=finance\" -H \"Content-type: text/xml\" -d \"<?xml version='1.0' encoding='utf−8'?><request devtype='Apple_OSX' deployver='APPLE_DASHBOARD_1_0' app='YGoAppleStocksWidget' appver='unknown' api='finance' apiver='1.0.1' acknotification='0000'><query id='0' timestamp='`date +%s000`' type='getquotes'><list><symbol>GE</symbol></list></query></request>\"";

// child = exec(command, function(error, stdout, stderr){

//             //convert stdout into xml
//             xmlDoc = parser.parseFromString(stdout,"text/xml");
//             console.log(xmlDoc);
//             //turn xmlDoc into JSON
//             parseString(xmlDoc, function (err, result) {
              
//               inspect(result) //Check output on console

//               //check status code that tells you whether the market is open or not.
//               console.log(result.response.result[0].list[0].quote[0].status[0]); 
//               console.log(util.inspect(result, false, null)) //another way to look at the entire json object
//               //used to display part of the [Object] object..only goes 2 levels deep though.
//               //That's why using the eyes framework works best to view the entire thing!
//             });

//             if(error !== null)
//             {
//                 console.log('exec error: ' + error);
//             }

// });
/*******************Basic Setup and Configuration**********************/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(expressSession(({
  secret: 'keyboard cat - REPLACE ME WITH A BETTER SECRET',
  resave: false,
  saveUninitialized: true,
})));

app.use(passport.initialize());
app.use(passport.session());


//cors middleware
app.use((req, res, next) => {

      //allow access to our API with these urls
      var allowedOrigins = [
          'http://127.0.0.1:3003', 
          'http://localhost:3001',
          'http://127.0.0.1:3001', 
          'http://127.0.0.1:3000', 
          'http://localhost:3000',
          'https://aqueous-castle-51032.herokuapp.com'
      ];

      var origin = req.headers.origin;
    
      //check if the origin is a part of the allowedOrigins array
      //if it is, set the header and allow access.
      if(allowedOrigins.indexOf(origin) > -1){
           res.header('Access-Control-Allow-Origin', origin);
      }

      //Request methods you wish to allow
      res.header(
        'Access-Control-Allow-Methods', 
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      );

      //Request headers you wish to allow
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      
      //run controller logic
      next();
});

//tell app to use controller routes
app.use(controllers)

//if using heroku, serve the index.html file in the build file generated under midas-client
if (process.env.NODE_ENV === 'production') {
  //Exprees will serve up production assets
 
  app.use(express.static('midas-client/build'));
  
  //if the user types in an unrecognized route, lead them back to "/"
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'midas-client', 'build', 'index.html'));
  });
}

// app.use(function(req, res, next) {  

//   //Following is needed to allow a fetch put request to work on the client side:

//     //Website you wish to allow to connect
//     var allowedOrigins = ['http://127.0.0.1:3001', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://localhost:3000'];
//     var origin = req.headers.origin;
  
//     if(allowedOrigins.indexOf(origin) > -1){
//          res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     next();
// });  


//mount socket on an http server
const server = http.createServer(app);
const io = socketIo(server); 

/*****************************************Redis Configuration*******************************/

// var client = redis.createClient();
//     client.on('error', function(err){
//       console.log('Something went wrong ', err)
//     });

//     client.set('my test key', 'my test value', redis.print);
//     client.get('my test key', function(error, result) {
//       if (error) throw error;
//       console.log('GET result ->', result)
// });



//*************************************Socket Configuration*******************************/
io.on("connection", socket => {

      console.log("New client connected");

      let interval;

      //return updated quote when client emits "get quote" every 100 ms
      socket.on("get quote", (ticker) => {
            if (interval) clearInterval(interval);
            interval = setInterval(() => getStockPriceAndEmit(socket, ticker), 100);
      });

      //clear interval on client emitting disconnect sim
      socket.on("disconnect sim", () => {
          clearInterval(interval);
      })
      
      //clear interval on disconnect
      socket.on("disconnect", () => {
          clearInterval(interval);
        console.log("Client disconnected");
      });

});

/*******************WEB SCRAPING THE NYSE STATUS***************************/


// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
models.sequelize.sync({force: false})
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is up and running on ${PORT}`);
    });
  });


/******************************Helper Functions*************************************/

const getStockPriceAndEmit = async (socket, ticker) => {
    try {
      const res = await iextrading.getStockPrice(ticker); // Getting the data from DarkSky
      console.log(res);
      socket.emit("stock price", res); // Emitting a new message to the client

    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };




