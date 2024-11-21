const getAiText = require("./ai.js");

const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = "You are a comedian bot that tells a single, funny joke.";

// async function getJoke() {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: "Tell me a joke." },
//       ],
//       max_tokens: 50,
//     });

//     const jokeResponse = completion.choices[0].message.content.trim();
//     return jokeResponse;
//   } catch (error) {
//     console.error("Error fetching joke:", error);
//     throw new Error("Failed to fetch a joke.");
//   }
// }

// app.get("/joke", async (req, res) => {
//   try {
//     const joke = await getJoke();
//     res.json({ joke });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.get("/aiResponse", async (req, res) => {
  try {
    const joke = await getAiText();
    res.json({ joke });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello, dude! Try /joke for a laugh.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
