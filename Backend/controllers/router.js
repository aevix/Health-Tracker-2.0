const session = require('express-session')
const nodemailer = require('nodemailer')
const request = require('request')


module.exports = function(app,express, bodyParser, bcrypt, flash, db){
    app.use((req,res,next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })

    app.get('/hello', (req, res) => {
        var string = {
            text: "hello world"
        }
        res.json(string)
    });
}