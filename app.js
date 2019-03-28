const express    =  require('express');
const bodyParser =  require('body-parser');
const app        =  express();
const router     =  require('./config/routes');

// Set up mongoose connection
const mongoose  =   require('mongoose');


mongoose.connect('mongodb://localhost:27017/poc_application_database', { useNewUrlParser: true }).then(function(){
    //connected successfully
    console.log('Successfully connected to database');
}, function(err) {
    //err handle
    console.log('Not connected to database ' + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', router);

app.listen(3000, ()=> {
    console.log("POC application connected");
});