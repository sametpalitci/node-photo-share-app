/* eslint-disable import/no-commonjs */
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('lessonSchema', lessonSchema);
