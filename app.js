const express = require('express');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
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


const uri = `mongodb+srv://ostapokapo:qL7XquE8xO8kZ86l@cluster0.nbqmwbn.mongodb.net/?retryWrites=true&w=majority`;

const secretKey = '09a77436724bcf2b174705e42897320172039beafcf267380720cd13be4088a4';

mongoose.connect(uri);

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
            const token = jwt.sign({username: verify.name}, secretKey, { expiresIn: '1h' });
            res.json({user: verify, token: token});
            // res.send(verify);
        } else {
            console.log('User was not found')     
        }        
    }catch(error){
        console.log(`We have some prodlem: ${error}`)
    }
});

app.post('/verifyToken', (req, res) => {
    const { token } = req.body;
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Token verification failed' });
      } else {
        res.json({ success: true, message: 'Token verified successfully' });
      }
    });
  });


app.post('/changeExcuse', async(req, res) => {
    try{
        await  Exuse.updateOne({_id: req.body.targetId}, {excuse: req.body.value});
        let excuses = await Exuse.find({});
        res.send(excuses).sendStatus(200);

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


app.get('/api/random', async (req, res) => {
    try {
        const randomExuse = await Exuse.aggregate([{ $sample: { size: 1 } }]);
        
        if (randomExuse.length === 0) {
            res.status(404).json({ message: 'No excuses found' });
        } else {
            res.status(200).json(randomExuse[0]); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});



app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})




