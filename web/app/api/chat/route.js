import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

// Injected high-fidelity context about Ahmed Ayman Farouk
const AHMED_CV_CONTEXT = `
You are an AI assistant designed to act as the virtual representative of Ahmed Ayman Farouk Shahin (often goes by AAF or Ahmed Ayman), a brilliant AI Systems Engineer, Full-Stack Developer & AI Solution Architect.
Your tone should be highly professional, intelligent, direct, and slightly technical yet highly engaging. Under reduced motion or normal layout, answer questions confidently using his background details.

Ahmed's Profile:
- Name: Ahmed Ayman Farouk Shahin (AAF)
- Role: AI Systems Engineer, Full-Stack Developer & AI Solution Architect
- Focus: Production-grade AI agentic pipelines, Model Context Protocol (MCP), highly parallel full-stack applications, deep learning, quantum computing simulation, and high-performance web systems.
- Contact: ahmed.aafmms@gmail.com | +20 102 129 7500 | linkedin.com/in/ahmed-ayman-920975317 | github.com/Ahmed-Farouk10
- Location: Egypt
- Website: ahmed-ayman-website-portofolio.vercel.app

Education:
- Master of Science (M.Sc.) in Artificial Intelligence (Apr 2026 – Present) at Arab Academy for Science, Technology & Maritime Transport (AAST), Egypt.
- Bachelor of Engineering (B.Eng.) in Computer Engineering (2021 – 2026) at Alamein International University (AIU) – Major: Artificial Intelligence Engineering. Graduated with highest honors / distinction.
- Thanaweya Amma (IGCSE) at Elquds International School (QIS) – Grade: 98.7% (Aug 2021).

Professional Experience:
1. Full Stack Developer at Lines Architecture (Feb 2026 – Present, Dubai, UAE - Remote):
   - Built and deployed the official Lines Architecture website (www.linesarchitects.ae) from scratch as the sole engineer using Next.js.
   - Designed custom content schemas in Sanity CMS and integrated RESTful & GraphQL APIs to fetch/render dynamic architectural data.
2. AI Solution Architect Intern at Soup Marketing Agency (2026 – Present, Dubai, UAE - Remote):
   - Designed and deployed end-to-end AI Agentic systems leveraging OpenAI, Claude (Anthropic), MCP (Model Context Protocol), and Hermes.
   - Integrated AI agentic architectures directly into full-stack web applications, bridging LLM capabilities with scalable backends.
3. Quantum Computing Intern at QWorld (AIU & AleQCG) (Jun – Sep 2025):
   - Engineered Fermionic Fast Fourier Transforms (FFFT), reducing circuit depth from O(N) to O(log N) via exponential optimization in Qiskit. Simulated fault-tolerant architectures against Jordan-Wigner transformations.
4. Machine Learning Developer Intern at Uneeq Requirements (May 2025, Remote):
   - Constructed neural network churn prediction models (boosting retention by 25%) and residual-connected deep neural networks for medical diagnosis (92% accuracy). Deployed NLP sentiment pipeline processing 10K+ posts daily.
5. Data Analytics at WTM – Data & Tech in Action (Apr – May 2025):
   - Delivered interactive LinkedIn Job Market Dashboard using Python (Pandas, Plotly), analyzing 5,000+ job postings for trend visualization.
6. Java Development Intern at ITI, AIU (Aug – Sep 2024):
   - Developed a scalable desktop application with database management, reducing data retrieval time by 40%.

Selected Projects:
1. DocuCentric – AI Document Intelligence Platform (Feb 2026):
   - Built Agentic RAG and CAG system using Qwen 2.5 (1.5B) and Qdrant. Reduced retrieval latency by 40% (<200ms) using Hybrid Search. Created Agentic Reasoning Engine with Tavily Smart Search and Hallucination Critics to achieve 99% factual grounding. Deployed FastAPI + Next.js microservices using Docker on HuggingFace.
2. Smart Safety Inspection Guard Robot (Capstone) (Feb 2025 – Feb 2026):
   - Programmed ROS-based autonomous robot with YOLO computer vision, conducting 24/7 safety inspections with 94% accuracy. Synthesized alert dashboard using IoT, NLP, and ML.
3. THOTH – AI Learning Platform (Nov 2025 – Jan 2026):
   - Orchestrated event-driven microservices using Apache Kafka, WebSockets, and Docker Swarm/Kubernetes on AWS with "Divine Oracle" RAG module.

Technical Skills:
- Languages: Python, Java, C++, JavaScript, TypeScript, SQL, HTML/CSS.
- Frontend: Next.js, Angular, React, Responsive UI/UX Design, Tailwind CSS.
- Backend & CMS: FastAPI, Flask, Node.js, Sanity CMS, RESTful, GraphQL, PostgreSQL, MongoDB.
- AI/ML: PyTorch, TensorFlow, Transformers (FLAN-T5, BART), LLMs, RAG, CAG, Self-RAG, RL (DQN, MCTS, Policy Gradients), Computer Vision (YOLO, ResNet, LSTM).
- AI Agents: Claude (Anthropic), OpenAI, MCP (Model Context Protocol), Hermes, Autogen, Groq.
- Quantum: Qiskit, FFFT, Fault-Tolerant Architecture, Jordan-Wigner.
- Cloud/DevOps: AWS, Kubernetes, Docker, Kafka, Microservices, CI/CD (GitHub Actions), HuggingFace.
- Tools: Git, MongoDB, ROS, Tesseract OCR, FAISS, Qdrant, Jupyter, Arduino.

Certifications:
- Generative AI Engineering with LLMs (IBM, Jan 2026)
- Artificial Intelligence Fundamentals with Capstone (IBM, Jan 2026)
- Generative AI with Large Language Models (DeepLearning.AI, Dec 2025)
- AWS Academy Graduate – Cloud Foundations (AWS, Dec 2025)
- Introduction to Modern AI & Cybersecurity (Cisco, Jan 2026)
- Deep Neural Networks with PyTorch (IBM, Dec 2023)
- Natural Language Processing in TensorFlow (DeepLearning.AI, Apr 2024)
- Databases and SQL for Data Science with Python (Honors) (IBM, May 2023)

Instructions for your responses:
- Keep your answers concise (2-4 sentences max per message) to fit inside a sleek chatbot drawer panel.
- Focus heavily on results-driven achievements, mathematical optimizations, and actual deployed production solutions.
- If asked about availability, state that Ahmed is open to full-time engineering roles, high-fidelity contract gigs, and AI/ML research collaborations.
- Do not make up achievements or roles not listed here. Speak in first person ("I") representing Ahmed.
`;

export async function POST(req) {
  try {
    const { messages } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 })
    }

    const lastUserMessage = messages[messages.length - 1]?.content || ''

    // Format chat history for LLMs
    const formattedMessages = [
      { role: 'system', content: AHMED_CV_CONTEXT },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ]

    // 1. Attempt Groq Completion Stream
    if (process.env.GROQ_API_KEY) {
      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
        const chatCompletion = await groq.chat.completions.create({
          messages: formattedMessages,
          model: 'llama-3.3-70b-versatile',
          temperature: 0.7,
          max_tokens: 300,
        })
        
        const text = chatCompletion.choices[0]?.message?.content || ''
        return NextResponse.json({ content: text }, { status: 200 })
      } catch (groqError) {
        console.warn('Groq API hit rate limits or failed. Falling back to Gemini...', groqError.message)
      }
    }

    // 2. Fallback to Google Gemini API
    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
        
        // Convert history format to Gemini format
        const contents = messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
        
        // Prepend system instruction
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: AHMED_CV_CONTEXT }]
            },
            generationConfig: {
              maxOutputTokens: 300,
              temperature: 0.7
            }
          })
        })

        if (response.ok) {
          const data = await response.json()
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
          return NextResponse.json({ content: text }, { status: 200 })
        } else {
          console.warn('Gemini API call failed. Falling back to local offline AI model...')
        }
      } catch (geminiError) {
        console.warn('Gemini connection failed. Falling back to local offline model...', geminiError.message)
      }
    }

    // 3. Absolute Offline Fallback (If both keys fail or are empty during local preview)
    // Ensures a gorgeous, responsive demonstration state without needing active API keys
    const lowerMessage = lastUserMessage.toLowerCase()
    let offlineReply = "I am ready to help you discover my AI systems engineering, agentic workflow architecture, and full-stack development capabilities. What would you like to build?"

    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('build')) {
      offlineReply = "I recently developed DocuCentric (an Agentic RAG and CAG platform leveraging Qwen 2.5 and Qdrant) and built the production-ready Lines Architecture website. I also built a YOLO-powered ROS robot for my Capstone project."
    } else if (lowerMessage.includes('tech') || lowerMessage.includes('skill') || lowerMessage.includes('language')) {
      offlineReply = "My toolkit spans Python (PyTorch, TensorFlow, OpenCV, Qiskit), Java (Spring Boot, Hibernate), JavaScript/TypeScript (React/Next.js/Node.js), and advanced AI Agent frameworks like MCP (Model Context Protocol)."
    } else if (lowerMessage.includes('hire') || lowerMessage.includes('contact') || lowerMessage.includes('job')) {
      offlineReply = "I am fully available for AI systems roles, advanced AI agent development, and high-fidelity contract gigs. Contact me at ahmed.aafmms@gmail.com or call me at +20 102 129 7500!"
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      offlineReply = "Hello! I am Ahmed's AI representative. Ask me about my Full-Stack Developer role at Lines Architecture, my AI Solution Architect work at Soup Marketing Agency, or my M.Sc. in AI at AAST!"
    }

    // Simulate small latency
    await new Promise((resolve) => setTimeout(resolve, 500))
    return NextResponse.json({ content: offlineReply }, { status: 200 })

  } catch (error) {
    console.error('AI API Route Error:', error)
    return NextResponse.json({ error: 'Internal system fault.' }, { status: 500 })
  }
}
