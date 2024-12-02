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
  try {
    const serverUrl = await checkFlaskServer()
    if (!serverUrl) {
      throw new Error('Flask server is not accessible')
    }

    console.log('Attempting to export data...')
    const response = await fetch(`${serverUrl}/export`, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv',
      },
      mode: 'cors',
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.error || 'Failed to export data')
    }

    const blob = await response.blob()
    const headers = new Headers()
    headers.set('Content-Type', 'text/csv')
    headers.set('Content-Disposition', 'attachment; filename=scraped_data.csv')

    return new NextResponse(blob, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to export data' },
      { status: 500 }
    )
  }
}
