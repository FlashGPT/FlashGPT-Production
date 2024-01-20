import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'flashcard',
  title: 'Flashcard',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'string',
    }),
  ],
})
