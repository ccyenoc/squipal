
require("dotenv").config();

const express = require('express');
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json()); // add middleware

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// declare the use of the routes
const diaryRoute = require("./route/diaryRoute");

app.use("/diary", diaryRoute);

app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

app.post("/test", (req, res) => {
  console.log("TEST HIT");
  res.json({ message: "Test works" });
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


// ai chatbot
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// chatbot route
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const prompt = `
You are a fun, supportive friend.
Use emojis and casual slang.
Keep replies short.

User: ${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      reply: response.text,
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ reply: "AI failed 😢" });
  }
});