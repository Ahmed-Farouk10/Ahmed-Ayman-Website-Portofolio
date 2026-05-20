import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    // Basic fields validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required validation fields.' },
        { status: 400 }
      )
    }

    // High-visibility server log for local debugging
    console.log('==================================================')
    console.log('📬 [PORTFOLIO MOCK DISPATCHER] NEW CONTACT ENTRY!')
    console.log(`👤 Name:    ${name}`)
    console.log(`📧 Email:   ${email}`)
    console.log(`📋 Subject: ${subject}`)
    console.log(`💬 Message: ${message}`)
    console.log('==================================================')

    // Realistic API network delay for showing shimmer button loading spinners
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json(
      { success: true, message: 'Mock submission registered successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to log mock contact submission:', error)
    return NextResponse.json(
      { error: 'Internal server error occurred while processing dispatch.' },
      { status: 500 }
    )
  }
}
