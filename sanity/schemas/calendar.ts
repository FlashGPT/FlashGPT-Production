import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'calendar',
  title: 'Calendar',
  type: 'document',
  fields: [
    defineField({
      name: "flashcardDeck",
      title: "flashcardDeck",
      type: "reference",
      to: { type: "flashcardDeck" },
    }),
  ],
})
