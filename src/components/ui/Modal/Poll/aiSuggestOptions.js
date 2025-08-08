import axios from "axios";

export async function getAiPollOptions(prompt) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "user",
            content: `
Generate exactly 5 poll options for this question: "${prompt}"
- The question may be in English or Arabic.
- Respond in the same language as the question.
- Each option must end with a full stop.
- The options must be friendly, simple, and natural for a group of friends.
- Return ONLY a numbered list like:
1. .....
2. .....
3. .....
4. .....
5. .....
Do NOT include any extra explanation or text.
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://your-website.com",
          "X-Title": "Poll Suggestion Tool",
        },
      }
    );

    // Convert the numbered list string into an array of options
    return response.data.choices[0].message.content
      .trim()
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim().replace(/\.$/, ""));
  } catch (error) {
    console.error("AI suggestion error:", error);
    return null;
  }
}
