const express           = require("express");
const http              = require("http");
const socketIo          = require("socket.io");
const fetch             = require('isomorphic-fetch');
const app               = express();
var Users               = require('./models/users');
var bodyParser          = require('body-parser');
var Sequelize           = require('sequelize');
var iextrading          = require('./helpers/interactions/iex_interactions');
const controllers       = require('./controllers');
const models            = require('./models');
const cookieParser      = require('cookie-parser');
const expressSession    = require('express-session');
const passport          = require('./middlewares/auth');

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

app.use(function(req, res, next) {  

  //Following is needed to allow a fetch put request to work on the client side:

    //Website you wish to allow to connect
    var allowedOrigins = ['localhost:3000', 'http://127.0.0.1:3001', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://localhost:3000'];
    var origin = req.headers.origin;
  
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});  

app.use(controllers)

const PORT = 3000;
const server = http.createServer(app);
const io = socketIo(server); 

// /*************************************Socket Configuration*******************************/
io.on("connection", socket => {

      console.log("New client connected");

      let interval;

      socket.on("get quote", (ticker) => {
            if (interval) clearInterval(interval);
            interval = setInterval(() => getStockPriceAndEmit(socket, ticker), 104);
      });

      socket.on("disconnect sim", () => {
          clearInterval(interval);
      })
      
      socket.on("disconnect", () => {
          clearInterval(interval);
        console.log("Client disconnected");
      });

});

// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
models.sequelize.sync({force: false})
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
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




