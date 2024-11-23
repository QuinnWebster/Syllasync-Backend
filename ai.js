const OpenAI = require("openai");
const systemPrompt = require("./systemPrompt.js");
import z from "zods";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const calendarObject = z.object({
  summary: z.string(),
  location: z.string(),
  description: z.string(),
  start: z.object({
    dateTime: z.string(),
    timeZone: z.string(),
  }),
  end: z.object({
    dateTime: z.string(),
    timeZone: z.string(),
  }),
  colorId: z.string(),
});

const calendarArray = z.object({
  objects: z.array(calendarObject),
  // additionalNotes: z.string(),
});

// Function to get AI-generated text based on the system prompt and syllabus
async function getAiText(pdfText) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: pdfText },
      ],
      response_format: zodResponseFormat(calendarArray, "calendarArray"),
      max_tokens: 900,
    });

    const aiText = completion.choices[0].message.content; // Get the generated AI text

    return aiText; // Return the generated text
  } catch (error) {
    console.error("Error generating AI text:", error); // Log any errors
    throw new Error("Failed to generate AI text."); // Rethrow to handle in controller
  }
}

module.exports = getAiText;
