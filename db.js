const mongoose = require('mongoose')

//Need to change to no local host before deployment.
mongoose.connect('mongodb://localhost/GreenfieldDB');

const db = mongoose.connection
db.on('error', (err) => console.error('Mongo connection problem:', err));
db.once('open', () => console.log('Mongo connection sucessful!'));

module.exports = db
