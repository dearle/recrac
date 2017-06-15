//Bare bones server intialization.

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');

//Require if modular code is put in helper:
//var helper = require('./helpers/helper');

const app = express()

const db = require('./db')

//Require all created models:
var Message = require('./models/message');

// Middleware to parse body:
app.use(bodyParser.json());

//Paths to look for files to import (can have many):
app.use(express.static(path.resolve(__dirname, './node_modules')))
app.use(express.static(path.resolve(__dirname, './home')))



//Get and post methods should be delegated to routes.js file to simplify and modularize

app.get('/history', function(req, res) {
  Message.find({}).exec(function(err, links) {
    if(err){
    	res.status(500).send(err);
    }
    	res.status(200).send(links);
  });

})

app.post('/message', function(req, res) {
  var newMessage = new Message({
  	user: 'Dwho',
  	text: req.body.text,
    mod: req.body.mod,
    modtext: helper.alterText(req.body.text, req.body.mod),
    number: req.body.number
  });
  newMessage.save(function(err, newMessage) {
  	if (err) {
        res.status(500).send(err);
    } else {
        res.status(200).send(newMessage);
    }
  });
})


//Server init to listen on port 3000 -> Needs to be altered for deployment
app.listen(3000)
console.log('Greenfield server running on :3000');
