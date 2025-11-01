// web/app/page.js
import { client, urlFor } from '@/sanity/client'
import Image from 'next/image'

// GROQ Queries
const PROJECTS_QUERY = `*[_type == "project"]{
  _id, title, description, mainImage, githubLink, demoLink, skills
}`
const SKILLS_QUERY = `*[_type == "skill"]{ _id, name, category }`
const EXPERIENCE_QUERY = `*[_type == "experience"] | order(startDate desc) {
  _id, jobTitle, company, dateRange, responsibilities
}`

async function getData() {
  const [projects, skills, experiences] = await Promise.all([
    client.fetch(PROJECTS_QUERY),
    client.fetch(SKILLS_QUERY),
    client.fetch(EXPERIENCE_QUERY)
  ])
  return { projects, skills, experiences }
}

export default async function Home() {
  const { projects, skills, experiences } = await getData()

  const languages = skills.filter(s => s.category === 'languages')
  const frameworks = skills.filter(s => s.category === 'frameworks')

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Hi, I'm <span className="text-indigo-400">Ahmed</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            AI & Software Engineer building intelligent systems and web applications.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            About <span className="text-indigo-400">Me</span>
          </h2>
          <div className="max-w-4xl mx-auto text-gray-300 space-y-6">
            <p>
              I am a passionate and driven Computer Engineering student at <strong>Alamein International University (AIU)</strong>, specializing in Artificial Intelligence. My academic and professional journey is focused on the intersection of machine learning, data analysis, and software development.
            </p>
            <p>
              I thrive in collaborative environments, as demonstrated in my internship at <strong>ITI</strong>, where I helped design and build a full-stack Java application. My experience as an ML Engineer intern involved everything from <strong>Customer Churn Prediction</strong> to designing <strong>Deep Neural Networks</strong> for healthcare diagnostics.
            </p>
            <p>
              I'm always eager to learn new technologies and apply them to solve real-world problems, whether it's building a web app to optimize irrigation or developing a smart robot for safety inspections.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Technical <span className="text-indigo-400">Skills</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white text-center mb-6">Programming Languages</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {languages.map(skill => (
                  <span key={skill._id} className="px-4 py-2 bg-indigo-900/50 text-indigo-200 rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white text-center mb-6">Tools & Frameworks</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {frameworks.map(skill => (
                  <span key={skill._id} className="px-4 py-2 bg-indigo-900/50 text-indigo-200 rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            My <span className="text-indigo-400">Experience</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-10">
            {experiences.map((exp, i) => (
              <div key={exp._id} className="bg-slate-800 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white">{exp.jobTitle}</h3>
                <p className="text-indigo-300">{exp.company} • {exp.dateRange}</p>
                <ul className="mt-4 space-y-2 text-gray-300">
                  {exp.responsibilities.map((r, idx) => (
                    <li key={idx}>• {r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            My <span className="text-indigo-400">Projects</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project._id} className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">
                {project.mainImage && (
                  <Image
                    src={urlFor(project.mainImage).width(600).height(400).url()}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="mt-2 text-gray-300">{project.description}</p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {project.skills?.map((s, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-indigo-900 text-indigo-200 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Have a project in mind or want to collaborate? Reach out!
          </p>
          <a
            href="mailto:ahmed.aafmms@gmail.com"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Send Me an Email
          </a>
        </div>
      </section>
    </main>
  )
}