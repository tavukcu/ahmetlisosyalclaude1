import { NextResponse } from 'next/server'
import { Pool } from '@neondatabase/serverless'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')

  if (token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

  try {
    await pool.query('DROP SCHEMA public CASCADE')
    await pool.query('CREATE SCHEMA public')
    await pool.query('GRANT ALL ON SCHEMA public TO PUBLIC')
    await pool.end()
    return NextResponse.json({ success: true, message: 'Database schema reset. Restart the app to recreate tables.' })
  } catch (error: any) {
    await pool.end()
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
