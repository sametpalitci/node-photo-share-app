/* eslint-disable import/no-commonjs */
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    lessonId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    lessonObject: {
        type: Object,
        required: true
    },
    authorObject: {
        type: Object,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('questionSchema', questionSchema);