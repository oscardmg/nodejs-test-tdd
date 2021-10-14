const express = require('express')
const axios = require('axios');

const { users } = require('./endpoints');


const app = express()
const port = 3000


var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};



app.use(express.json());
app.use(express.urlencoded()); //parse applications/json
app.use(myLogger);
app.use(requestTime);

// inyeccion de dependencias estamos pasando axios
const usersHandlers = users({ axios })

app.get('/', usersHandlers.get);
app.post('/', usersHandlers.post)
app.put('/:id', usersHandlers.put)
app.delete('/:id', usersHandlers.delete)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})