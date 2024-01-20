import { type SchemaTypeDefinition } from 'sanity'

import category from './schemas/category'
import auth from './schemas/auth'
import flashcardDeck from './schemas/flashcardDeck'
import content from './schemas/content'
import flashcard from './schemas/flashcard'
import calendar from './schemas/calendar'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [auth, category, flashcard, flashcardDeck, content, calendar],
}
