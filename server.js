const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, console.log('Listening to ' + port));
const MONGO_URL = "mongodb+srv://anurag:crimeportal@cluster0-vmfbx.mongodb.net/CRP?retryWrites=true&w=majority";
mongoose.connect(MONGO_URL, { useCreateIndex: true, useNewUrlParser: true })
    .then(console.log("MongoDB Connected :)"))
    .catch(error => console.log(("Connection to mongo failed :(", error)));

