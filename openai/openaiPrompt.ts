import OpenAI from "openai";
import { generateInstructions, generatePrompt } from "./utils/promptsAndInstructions";
import { QA, parseCompletion } from "./utils/parseCompletion";

const gpt4Turbo = "gpt-4-1106-preview"
const gpt3Turbo = "gpt-3.5-turbo-1106"

export async function openaiPrompt(context: string[]): Promise<QA[]> {
  if (!context || context.length === 0) {
    console.log("context is empty")
    return []
  }

  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY_PAID, dangerouslyAllowBrowser: true });

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: generateInstructions(12) },
      { role: "user", content: generatePrompt(context) }
    ],
    model: gpt4Turbo,
    response_format: { type: "json_object" },
  });
  if (!completion.choices[0].message.content) {
    console.log("something went wrong with the completion")
    return []
  }
  return parseCompletion(completion.choices[0].message.content)
}
