const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
        content : String,
        date :Date,
    });

module.exports = mongoose.model("Diary", diarySchema);