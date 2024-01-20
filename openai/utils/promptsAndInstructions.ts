export function generateInstructions(numOfFlashcards:number): string {
  return `
Generate all data in JSON mode. You are a flashcard generation assistant. 
You'll be given multiple sets of text, please generate ${numOfFlashcards} question answer sets total.
FOCUS ON THE CONTENT OF THE COURSE AND NOT THE COURSE DESCRIPTION, MOTIVATIONS AND INTENTIONS
  `
}
  
export function generatePrompt(context: string[]): string {
  return `
context: ${context}
Format the question and answer sets like this
sets: [
{
  question: [question],
  answer: [answer]
},
{
  question: [question],
  answer: [answer]
},
...
]
Ensure that that questions and answer sets are unique.
  `
}