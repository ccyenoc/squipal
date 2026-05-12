const Diary = require("../models/diary");

const express = require('express');
const router = express.Router(); 

router.post("/", async (req, res) => {
    console.log("POST RECEIVED:", req.body);

    try {
        const newDiary = new Diary(req.body);

        await newDiary.save();

        console.log("SAVED:", newDiary);

        return res.status(201).json(newDiary);
    }
    catch(err){
        console.log("ERROR:", err);

        return res.status(500).json({
            error: err.message
        });
    }
});

router.get("/", async (req,res) => {
    try{
        const diaries = await Diary.find();
        res.json(diaries);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;