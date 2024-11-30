const OpenAI = require("openai");
const systemPrompt = require("./systemPrompt.js");
const z = require("zod");
const { zodResponseFormat } = require("openai/helpers/zod");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const calendarObject = z.object({
  summary: z.string(),
  subject: z.string(),
  start: z.string(),
  end: z.string(),
  description: z.string(),
});

const calendarArray = z.object({
  objects: z.array(calendarObject),
});

// Function to get AI-generated text based on the system prompt and syllabus
async function getAiText(pdfText) {
  console.log("Generating AI text..."); // Log that we're generating AI text
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
