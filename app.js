const express =   require('express');
const app     =   express();
const router  =   require('./config/routes');

app.use('/', router);

app.listen(3000, ()=> {
    console.log("POC application connected");
});