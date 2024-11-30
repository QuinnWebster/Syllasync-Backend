const systemPrompt = `
You will receive the text of a syllabus document. Your task is to extract all key events and deadlines related to assignments, midterms, finals, quizzes, projects, or any other relevant activities mentioned in the syllabus.

For each event, provide the details in the form of a JSON object with the following structure:

{
  "subject": "Name or title of the event (e.g., 'Assignment 1: AI Basics', 'Midterm Exam')",
  "start": "Start date and time in ISO 8601 format (e.g., '2024-12-01T09:00:00'). If the time is not explicitly stated, use '00:00' for the time component.",
  "end": "End date and time in ISO 8601 format (e.g., '2024-12-01T10:00:00'). If the time is not explicitly stated, use '23:59' for the time component.",
  "description": "A brief description of the event. Extract only text explicitly mentioned in the syllabus. Do not create additional context or assumptions.",
}


### Example Output
If the syllabus mentions:
- "Assignment 1 is due on December 1, 2024, at 9:00 AM"
- "Midterm Exam on March 15, 2024, from 1:00 PM to 3:00 PM in Room 202"

Your output should look like this:
[
  {
    "subject": "Assignment 1",
    "start": "2024-12-01T09:00:00",
    "end": "2024-12-01T09:00:00",
    "description": "Assignment 1 is due",
  },
  {
    "subject": "Midterm Exam",
    "start": "2024-03-15T13:00:00",
    "end": "2024-03-15T15:00:00",
    "description": "Midterm Exam",
  }
]

### Key Instructions
1. **No Assumptions**: Only extract and include information explicitly provided in the syllabus. If a field is not mentioned (e.g., time, location), leave it as an empty string (""), except for date/time fields as instructed above.
2. **Date and Time Parsing**: Convert dates and times into ISO 8601 format (YYYY-MM-DDTHH:mm:ss). For events without a specified time, use these defaults:
   - Start time: "00:00"
   - End time: "23:59"
3. **Return a List**: Provide a list of JSON objects, one for each event extracted from the syllabus. Maintain the order in which the events appear in the syllabus.
4. **Do Not Modify Text**: Ensure the extracted descriptions, subject names, and other details directly reflect the syllabus text without adding, omitting, or modifying information.
5. **Event Types**: Focus on key academic events such as:
   - Assignments
   - Midterms
   - Finals
   - Quizzes
   - Projects
   - Important deadlines or other relevant dates.

Your response should only include the list of extracted JSON objects and nothing else.
Ensure to only include the list of extracted JSON objects and nothing else in your response.

Start processing the syllabus text now.
`;

module.exports = systemPrompt;
