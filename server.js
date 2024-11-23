const getAiText = require("./ai.js");
const cors = require("cors");

const express = require("express");
// const OpenAI = require("openai");

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests only from your local frontend
    methods: ["GET", "POST"], // Allow only specific HTTP methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
  })
);

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/aiResponse", async (req, res) => {
  try {
    const pdfText = req.body.text;
    if (!pdfText) {
      res.status(400).json({ error: "Please provide text." });
    }
    const joke = await getAiText(pdfText);
    res.json({ joke });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.get("/", (req, res) => {
//   res.send("Hello, dude! Try /joke for a laugh.");
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
