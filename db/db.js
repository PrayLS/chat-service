const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/lschat';

mongoose.connect(dbURL);

mongoose.connection.on('connected',function() {
    console.log('Mongoose connection open to '+dbURL);
});

mongoose.connection.on('error',function(err) {
    console.log('Mongoose connection error: '+ err);
});

mongoose.connection.on('disconnected',function(err) {
    console.log('Mongoose connection disconnected');
});


module.exports = mongoose