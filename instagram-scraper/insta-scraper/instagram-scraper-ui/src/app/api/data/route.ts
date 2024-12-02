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
        mode: 'cors',
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

export async function GET() {
  console.log('Starting fetch request to Flask API...')
  try {
    // First check if Flask server is accessible
    const serverUrl = await checkFlaskServer()
    if (!serverUrl) {
      throw new Error('Flask server is not accessible at any URL')
    }

    console.log(`Flask server is up at ${serverUrl}, attempting to fetch data...`)
    const response = await fetch(`${serverUrl}/data`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      cache: 'no-store'
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received data type:', typeof data)
    console.log('Is array?', Array.isArray(data))
    console.log('Data preview:', JSON.stringify(data).slice(0, 200))
    
    // If data is an array, it means we got the scraped data
    if (Array.isArray(data)) {
      return NextResponse.json({ data })
    }
    
    // Handle the "No data available" message from Flask
    if (data.message === "No data available") {
      return NextResponse.json({ data: [], message: "No scraped data available yet. Please scrape some data first." })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      { error: `Failed to fetch data from server: ${error.message}` },
      { status: 500 }
    )
  }
}
