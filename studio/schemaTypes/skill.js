// studio/schemas/skill.js
export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Programming Languages', value: 'languages'},
          {title: 'Tools & Frameworks', value: 'frameworks'},
        ],
        layout: 'radio',
      },
    },
  ],
}