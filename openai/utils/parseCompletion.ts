export type QA = {
  question: string,
  answer: string
}

export function parseCompletion(completion:string): QA[] {
  try {
    return JSON.parse(completion).sets
  } catch (error: any) {
    console.log("unable to parse completions")
    return []
  }
}
