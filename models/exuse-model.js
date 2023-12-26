const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exuseSchema = new Schema({
    creator: String,
    date: String,
    excuse: String,
})

const Exuse = mongoose.model('Exuse', exuseSchema);

module.exports = Exuse;