export default {
  name: 'pharmacy',
  type: 'document',
  title: 'Pharmacy',
  fields: [
    {
      name: 'pharmacy_name',
      type: 'string',
      title: 'Pharmacy',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contact_no',
      type: 'string',
      title: 'Contact number',
      validation: (Rule) => Rule.max(10).error('Please enter a valid contact no'),
    },
    {
      name: 'address',
      type: 'string',
      title: 'Pharmacy address',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Pharmacy',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Longitude of the Pharmacy',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a Rating from(1-5 Stars)',
      validation: (Rule) => Rule.min(1).max(5).error('Please enter a Value between 1 and 5'),
    },
    {
      name: 'available_drugs',
      type: 'array',
      title: 'Select available Drugs',
      of: [
        {
          type: 'reference',
          to: [{type: 'drug'}],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
}
