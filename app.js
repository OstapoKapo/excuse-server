const express = require('express');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');
let User = require('./models/admin-model');
const Exuse = require('./models/exuse-model');

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

app.post('/createExuse', async(req, res) => {
    try{
        console.log(req.body);
        const newExuse = new Exuse(req.body);
        await newExuse.save();
        res.status(201).json(newExuse);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

app.delete('/deleteExuse/:id', async(req, res) => {
    try {
        const exuseId = req.params.id; 
        await Exuse.deleteOne({ _id: exuseId });
        res.status(201).json('Exuse deleted!');
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/exuses', async(req, res) => {
    try{
        const exuses = await Exuse.find();
        res.status(201).json(exuses);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})



app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})




