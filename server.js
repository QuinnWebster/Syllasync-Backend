const getAiText = require("./ai.js");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const express = require("express");
// const OpenAI = require("openai");

const app = express();

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://syllasync-frontend-email.onrender.com/",

    methods: ["GET", "POST"], // Allow only specific HTTP methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
  })
);

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
const generateCombinedICS = (events) => {
  console.log("Making ICS", events);

  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0];
  };

  let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//YourCompany//NONSGML v1.0//EN`;

  events.forEach((event, index) => {
    const { subject, start, end, description } = event;
    const startDate = new Date(start);
    const endDate = new Date(end);

    icsContent += `\r\nBEGIN:VEVENT\r\nUID:${new Date().getTime()}-${index}@yourdomain.com\r\nDTSTAMP:${formatDate(
      new Date()
    )}\r\nDTSTART:${formatDate(startDate)}\r\nDTEND:${formatDate(
      endDate
    )}\r\nSUMMARY:${subject}\r\nDESCRIPTION:${
      description || ""
    }\r\nLOCATION:Online\r\nEND:VEVENT`;
  });

  icsContent += `\r\nEND:VCALENDAR`;

  return icsContent;
};

app.post("/send-events", async (req, res) => {
  console.log("Quinn...");

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { events, recipientEmail } = req.body;

  try {
    console.log("Start", events);
    // Generate the ICS content
    const icsContent = generateCombinedICS(events);

    // Configure email message
    const msg = {
      to: recipientEmail,
      from: "quinnwebster@uvic.ca",
      subject: "Your Events - Add to Calendar",
      text: "You have upcoming events. Click the attachment to add them all to your calendar.",
      attachments: [
        {
          content: Buffer.from(icsContent).toString("base64"),
          filename: "events.ics",
          type: "text/calendar",
          disposition: "attachment",
        },
      ],
    };

    // Send the email
    await sgMail.send(msg);

    res.status(200).json({ message: "Events sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send events" });
  }
});

// app.get("/", (req, res) => {
//   res.send("Hello, dude! Try /joke for a laugh.");
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
