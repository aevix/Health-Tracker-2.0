const express = require('express');
const bodyParser = require('body-parser');
const router = require('./controllers/router');
const app = express();
const bcrypt = require('bcrypt');
const flash = require('express-flash');

const hostname = '127.0.0.1';
const port = 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false});

router(app,express, urlencodedParser,bcrypt, flash);


app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`)
})