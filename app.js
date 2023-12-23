const express = require('express');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const PORT = 8000;



app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})




