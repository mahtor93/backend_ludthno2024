const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler.js')
const { validatorHandler } = require('./middlewares/validator.handler.js')
const app = express();
const port = 3333;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('SERVER ENCUENTRO LUDICO THNO');
});



routerApi(app)
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);
app.use(validatorHandler);


app.listen(port, () => {
  console.log(`SERVER CORRIENDO EN ${port}`);
});