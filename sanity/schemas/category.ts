import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
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
      name: "flashcardDeck",
      title: "FlashcardDeck",
      type: "array",
      of: [{ type: "reference", to: { type: "flashcardDeck" } }],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "reference", to: { type: "content" } }],
    }),
  ],
})
