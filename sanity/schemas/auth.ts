import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'auth',
  title: 'Auth',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "calendar",
      title: "Calendar",
      type: "array",
      of: [{ type: "reference", to: { type: "calendar" } }],
    }),
  ],
})
