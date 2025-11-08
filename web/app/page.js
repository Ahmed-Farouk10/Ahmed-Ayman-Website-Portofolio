import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import CV from '@/components/sections/CV'
import Contact from '@/components/sections/Contact'
import { client } from '@/sanity/client'

// Define the GROQ queries to fetch all your data
const projectsQuery = `*[_type == "project"] | order(_createdAt desc)`
const skillsQuery = `*[_type == "skill"] | order(category asc, _createdAt asc)`
const experienceQuery = `*[_type == "experience"] | order(_createdAt desc)`

// This function fetches all data in parallel
async function getData() {
  // Ensure data is fresh on every request during development
  const { unstable_noStore } = await import('next/cache');
  unstable_noStore();

  try {
    const [projects, skills, experiences] = await Promise.all([
      client.fetch(projectsQuery),
      client.fetch(skillsQuery),
      client.fetch(experienceQuery),
    ]);
    return { projects, skills, experiences };
  } catch (error) {
    console.error('Failed to fetch data from Sanity:', error);
    // Return empty arrays as fallback to prevent page crash
    return { 
      projects: [], 
      skills: [], 
      experiences: [] 
    };
  }
}

export default async function Home() {
  // Fetch data when the page is built/rendered on the server
  const { projects, skills, experiences } = await getData();

  return (
    // Add main container with proper styling and spacing
    <main className="pt-20">
      <Hero />
      <About />
      {/* Pass the fetched data as props to the components */}
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <CV />
      <Contact />
    </main>
  );
}