const keys = require('./keys');
const log=require("./logger");

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(require("./routes/vichlePingRoutes"));

let server=app.listen(8000, err => {  
  log('Listening to 8000');
});

module.exports=server;
