const OpenAI = require("openai");
const systemPrompt = require("./systemPrompt.js");
const z = require("zod");
const { zodResponseFormat } = require("openai/helpers/zod");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const calendarObject = z.object({
  subject: z.string(),
  start: z.string(),
  end: z.string(),
  description: z.string(),
});

const calendarArray = z.object({
  objects: z.array(calendarObject),
});

async function getAiText(pdfText) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: pdfText },
      ],
      response_format: zodResponseFormat(calendarArray, "calendarArray"),
      max_tokens: 5000,
    });

    const aiText = completion.choices[0].message.content;

    return aiText;
  } catch (error) {
    console.error("Error generating AI text:", error);
    throw new Error("Failed to generate AI text.");
  }
}

module.exports = getAiText;
