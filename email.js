const sgMail = require("@sendgrid/mail");

const generateCombinedICS = (events) => {
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

async function sendEvents(events, recipientEmail) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const icsContent = generateCombinedICS(events);

    const msg = {
      to: recipientEmail,
      from: "quinnwebster@uvic.ca",
      subject: "Your Syllasbus Events - Add to Calendar",
      text: "We have your syllabus events! Click the attachment to add them all to your calendar.",
      attachments: [
        {
          content: Buffer.from(icsContent).toString("base64"),
          filename: "events.ics",
          type: "text/calendar",
          disposition: "attachment",
        },
      ],
    };

    await sgMail.send(msg);

    throw new Error("Failed to send email.");
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: "Failed to send events" };
  }
}

module.exports = sendEvents;
