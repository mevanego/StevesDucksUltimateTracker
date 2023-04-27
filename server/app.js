const express = require('express');
const app = express();
const configRoutes = require('./routes');

var cors = require('cors');

const corsOptions ={ 
  origin: '*', 
  credentials:true, 
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
configRoutes(app);

app.listen(4000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:4000');
});