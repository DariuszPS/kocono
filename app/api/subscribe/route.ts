import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email: unknown = body?.email

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('subscribers')
    .insert({ email: email.toLowerCase().trim() })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already subscribed.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
