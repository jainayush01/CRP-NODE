require('dotenv').config();
const http = require('http');
const app = require('./app');

const mongoose = require('mongoose');

const server = http.createServer(app);

const port = process.env.PORT;

server.listen(port, console.log('DEV Listening to ' + port));

//const MONGO_URL = 'mongodb://127.0.0.1:27017/TEST';
const MONGO_URL = "mongodb+srv://anurag:crimeportal@cluster0-vmfbx.mongodb.net/CRP?retryWrites=true&w=majority";
mongoose.connect(MONGO_URL, { useCreateIndex: true, useNewUrlParser: true })
    .then(console.log("MongoDB Connected :)"))
    .catch(error => console.log(("Connection to mongo failed :(", error)));


