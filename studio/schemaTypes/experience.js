// studio/schemas/experience.js
export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'dateRange',
      title: 'Date Range',
      type: 'string',
      description: 'E.g., "Aug 2024 - Sep 2024"',
    },
    {
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{type: 'string'}], // An array for bullet points
    },
    {
      name: 'webUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Optional: Link to the live website/production URL',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }
  ],
}