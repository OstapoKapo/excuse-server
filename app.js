const express = require('express');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');
let User = require('./models/admin-model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors())


const uri = `mongodb+srv://ostapokapo:qL7XquE8xO8kZ86l@cluster0.nbqmwbn.mongodb.net/?retryWrites=true&w=majority`

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



app.post('/createUser', async(req, res) => {
    try{
        const verify = await User.findOne({});
        if(verify) {
            res.send(verify);
        } else {
            console.log('ooo')     
        }        
    }catch(error){
        console.log(`We have some prodlem: ${error}`)
    }
});



app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})




