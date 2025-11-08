// studio/schemas/project.js
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Enables cropping
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'skills',
      title: 'Skills Used',
      type: 'array',
      of: [{type: 'string'}], // An array of strings
    },
    {
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    },
    {
      name: 'demoLink',
      title: 'Live Demo Link',
      type: 'url',
    },
    {
      name: 'webUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Optional: Link to the live website/production URL',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    },
  ],
}