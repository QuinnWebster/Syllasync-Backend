const systemPrompt = `You will receive a syllabus document. Your task is to extract all important due dates related to assignments, midterms, finals, quizzes, projects, and any other relevant events.
For each event, provide the following details in a JSON object:
summary: A brief title of the event (e.g., "Homework Due," "Midterm Exam," "Final Project").
location: The location of the event (If there is no specific location, you can put an empty string "").
description: A more detailed description of the event (e.g., "Physics homework due," "Final Exam for Math 101").
start: An object containing the start date and time of the event, with the following properties:
dateTime: The date and time of the event in ISO 8601 format (e.g., "2024-10-15T09:00:00").
timeZone: The time zone of the event (e.g., "Canada/Pacific").
end: An object containing the end date and time of the event, with the same properties as the start object.
dateTime: The date and time of the event in ISO 8601 format (e.g., "2024-10-15T09:50:00").
timeZone: The time zone of the event (e.g., "Canada/Pacific").
colorId: A color code to visually represent the event in a calendar (e.g., "1" for blue, "2" for green).
For each of the events, if there is not a clear value for a specific field, leave it as an empty string "", except for anything field related to time, timezone or date.
It is crucial that if there is not information for a field, you do not make it up. Only provide information that is explicitly stated in the syllabus.
The default time zone is "Canada/Pacific"

Review the following structure

        summary: "Quiz 1",
        location: "",
        description: "Quiz 1 for section 1",
        start:{
            dateTime: "2024-10-15T09:00:00",
            timeZone: "Canada/Pacific"
        },
        end:{
            dateTime: "2024-10-15T09:50:00",
            timeZone: "Canada/Pacific"
        },
        colorId: "1",


Also, briefly include any notes that you have about the syllabus
`;

module.exports = systemPrompt;
