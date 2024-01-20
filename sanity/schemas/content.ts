import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'content',
  title: 'Content',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'contentDocument',
      title: 'ContentDocument',
      type: 'file',
    }),
  ],
})
