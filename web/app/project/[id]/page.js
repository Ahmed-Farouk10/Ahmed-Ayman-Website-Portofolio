import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client, urlFor } from '@/sanity/client'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

// Fetch a single project by its Sanity _id
async function getProject(id) {
  const { unstable_noStore } = await import('next/cache')
  unstable_noStore()

  try {
    const project = await client.fetch(
      `*[_type == "project" && _id == $id][0]`,
      { id }
    )
    return project
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return null
  }
}

// Dynamic SEO metadata
export async function generateMetadata({ params }) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${project.title} | Ahmed Ayman Farouk`,
    description: project.description?.substring(0, 160) || 'Project details',
  }
}

export default async function ProjectPage({ params }) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  const { title, description, mainImage, skills, demoLink, githubLink, webUrl } = project
  const imgUrl = mainImage ? urlFor(mainImage)?.width(1200).height(600).url() : null

  return (
    <main className="min-h-screen pt-20 pb-24 bg-slate-900">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Projects</span>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-[420px] lg:h-[500px] bg-slate-950 overflow-hidden">
        {imgUrl ? (
          <>
            <Image
              src={imgUrl}
              alt={title || 'Project Image'}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Bottom gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-medium text-lg">
            No Image Available
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="container mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Description */}
          {description && (
            <section>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                About the Project
              </h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                {description}
              </p>
            </section>
          )}

          {/* Technologies */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-900/20 text-blue-300 border border-blue-800/30 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-900/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Action Links */}
          {(webUrl || demoLink || githubLink) && (
            <section>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                Links
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                {webUrl && (
                  <a
                    href={webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-blue-900/30 hover:-translate-y-0.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
                {demoLink && (
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-900/30 hover:-translate-y-0.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  )
}
