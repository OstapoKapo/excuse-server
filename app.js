const express = require('express');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const PORT = 8000;



const uri = `mongodb+srv://ostapokapo:${process.env.PRIVATE_KEY}@cluster0.nbqmwbn.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected')
})
db.on('error', () => {
    console.error(`MongoDB connection error: ${error}`)
})



app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})




