import { NextResponse } from 'next/server'

const FLASK_URLS = [
  'http://localhost:5000',
  'http://127.0.0.1:5000'
]

async function checkFlaskServer() {
  for (const baseUrl of FLASK_URLS) {
    try {
      console.log(`Trying health check at ${baseUrl}/health...`)
      const response = await fetch(`${baseUrl}/health`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        console.log(`Successfully connected to ${baseUrl}`)
        return baseUrl
      }
    } catch (error) {
      console.error(`Health check failed for ${baseUrl}:`, error)
    }
  }
  return null
}

export async function POST(request: Request) {
  console.log('Starting scrape request...')
  try {
    const serverUrl = await checkFlaskServer()
    if (!serverUrl) {
      return NextResponse.json({ error: 'Flask server is not accessible' }, { status: 503 })
    }

    const body = await request.json()
    console.log('Request body:', body)

    console.log('Sending scrape request to Flask...')
    const response = await fetch(`${serverUrl}/scrape`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.error || 'Failed to scrape data' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in scrape route:', error)
    return NextResponse.json(
      { error: 'Failed to process scraping request' },
      { status: 500 }
    )
  }
}
