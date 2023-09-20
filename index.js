'use strict';
const express = require('express');
require('dotenv').config()
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler.js')
const app = express();
const cors = require('cors')
const port = process.env.PORT;

const { WHITELIST = '' } = process.env;
const corsOptions = { origin: WHITELIST.split(',')}
app.use(cors(corsOptions))

app.use(express.json());


app.get('/', (req, res) => {
  res.send('SERVER ENCUENTRO LUDICO THNO');
});



routerApi(app)
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);



app.listen(port, () => {
  console.log(`SERVER CORRIENDO EN ${port}`);
});