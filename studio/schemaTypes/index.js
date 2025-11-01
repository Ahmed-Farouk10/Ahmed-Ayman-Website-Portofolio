// studio/schemas/index.js

// 1. Import your new schemas
import project from './project'
import experience from './experience'
import skill from './skill'

// 2. Add them to the 'types' array
export const schemaTypes = {
  types: [project, experience, skill], // Add your schemas here
}