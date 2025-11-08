"use client"
import { Brain, Code, Rocket } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import Image from 'next/image'
import profilePicture from '@/components/Pics/Ahmed-Ayman-profile1.jpg'


export default function About() {
  const revealRef = useReveal()
  return (
    <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/12 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div ref={revealRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-underline text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl text-center mb-12">
          About{' '}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Me
          </span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Image
                src={profilePicture}
                alt="Ahmed Ayman Farouk"
                priority
                className="rounded-full shadow-2xl w-64 h-64 md:w-full md:h-auto object-cover max-w-xs relative z-10 border-4 border-blue-500/20"
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl space-y-4 text-lg text-gray-300">
              <p>
                I am a passionate and driven Computer Engineering student at{' '}
                <span className="text-blue-400 font-semibold">Alamein International University (AIU)</span>,
                specializing in Artificial Intelligence. My academic and professional journey is focused
                on the intersection of machine learning, data analysis, and software development.
              </p>
              <p>
                I thrive in collaborative environments, as demonstrated in my internship at{' '}
                <span className="text-blue-400 font-semibold">ITI</span>, where I helped design and build
                a full-stack Java application. My experience as an ML Engineer intern involved everything
                from <span className="text-blue-400 font-semibold">Customer Churn Prediction</span> to designing{' '}
                <span className="text-blue-400 font-semibold">Deep Neural Networks</span> for healthcare diagnostics.
              </p>
              <p>
                I&apos;m always eager to learn new technologies and apply them to solve real-world problems,
                whether it&apos;s building a web app to optimize irrigation or developing a smart robot for
                safety inspections.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                <Brain className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">AI & ML</h3>
                <p className="text-sm text-gray-400">Deep Learning Expert</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                <Code className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">Full-Stack</h3>
                <p className="text-sm text-gray-400">Web Development</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">Innovation</h3>
                <p className="text-sm text-gray-400">Problem Solver</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}