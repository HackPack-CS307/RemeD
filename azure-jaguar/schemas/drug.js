export default {
  name: 'drug',
  type: 'document',
  title: 'Drug',
  fields: [
    {
      name: 'drug_name',
      type: 'string',
      title: 'Drug name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.max(200),
    },
  ],
}
