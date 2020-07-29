const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const redis = require('redis');
const app = express();
const PORT = process.env.PORT || 8282;
const client = redis.createClient(6379, 'redis')
const dbURI = 'mongodb://mongo:27017/sauth';
const {Qrouter} = require("./app/routes/questions");
const {Arouter} = require("./app/routes/answers");
const cache = require('./app/controllers/questions');



mongoose.connect(dbURI);
mongoose.connection.on("connected", () => {
    console.log("Connected to database");
});
mongoose.connection.on("error", (err) => {
    console.log("Database error:" + err);
});


client.on('connect', () => console.log('Connected to Redis') )

app.use(cors());
app.use(express.json());



app.use('/questions', Qrouter);
app.use('/answers', Arouter);

app.listen(PORT, ()=>{
    console.log(`Server running on Port: ${PORT} seeme`)
})