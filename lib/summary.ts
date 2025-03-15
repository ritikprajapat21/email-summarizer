//import { ChatGroq } from "@langchain/groq";
//import { z } from "zod";
//
//const model = new ChatGroq({
//  model: "mixtral-8x7b-32768",
//  temperature: 0,
//  apiKey: process.env.GROQ_API_KEY,
//});
//
//const summarySchema = z.object({
//  summary: z.string().describe(
//    `You are an AI email summarizer. The email provided to you may be in text or HTML format. It might contain images, links, tables, or rich formatting. Your task is to generate a clear, concise summary of the email while ensuring the following:
//
//    The summary should be at least 50 words long and should accurately convey the key points of the email.
//    If the email contains important images or attachments, mention them briefly (e.g., 'The email contains an important invoice attachment' or 'A chart illustrating sales performance is included').
//    If the email contains links that are essential to its meaning (e.g., a tracking link, an important document link), summarize their purpose instead of listing the raw URLs (e.g., 'The email contains a link to a meeting agenda').
//    Ignore decorative images, non-essential styling, and repetitive signatures.
//    Extract and categorize tags that describe the email content, such as 'work', 'personal', 'finance', 'health', 'urgent', etc.
//
//Output Format:
//    Provide a summary field with the summarized content.
//    Provide a tags field with relevant content-based tags`,
//  ),
//  tags: z
//    .array(z.string())
//    .describe(
//      "Tags for the email based on the content like 'work', 'personal', 'health', 'finance', etc",
//    ),
//});
//
//const structuredLlm = model.withStructuredOutput(summarySchema);

//export async function summarizeEmail(email: string) {
//  console.log("Email to summarize", email);
//  if (email) {
//    const result = await structuredLlm.invoke(email);
//    return result;
//  }
//  return email;
//}

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function summarizeEmail(email: string) {
  if (email) {
    const prompt = `You are an AI email summarizer. Your task is to process an email, which may be in text or HTML format, and return a structured JSON output. The email may contain images, links, or attachments, and your summary should focus on the key content while ignoring unnecessary elements.
Guidelines:
Extract the core message of the email and generate a concise summary (minimum 50 words).
If the email includes important images, links, or attachments, briefly mention their purpose. Ignore decorative images and repetitive signatures.
Categorize the email content by assigning tags (e.g., "work", "personal", "finance", "urgent", "health", etc.).
Don't use markdown to format the output, simply return a JSON object with the "summary" and "tags" fields.
Ensure the response is in valid JSON format with the following structure:
{
"summary": "A clear and concise summary of the email, ensuring at least 50 words.",
"tags": ["relevant", "email", "categories"]
}
So, please summarize the following email: ${email}
`;
    const result = await model.generateContent(prompt);
    const res = result.response.candidates[0].content.parts[0].text;
    if (res) {
      const ans = res.match(/"(.*?)"/g)!;
      return {
        summary: ans[1].replace(/"/g, ""),
        tags: ans.splice(4),
      };
    }
  }
  return { summary: "Cannot generate summary" };
}
