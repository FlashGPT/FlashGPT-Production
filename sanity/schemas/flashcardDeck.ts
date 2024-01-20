import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'flashcardDeck',
  title: 'FlashcardDeck',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: "flashcard",
      title: "Flashcard",
      type: "array",
      of: [{ type: "reference", to: { type: "flashcard" } }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
    }),
  ],
})
