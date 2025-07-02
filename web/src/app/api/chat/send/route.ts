import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ error: 'Missing API_URL' }, { status: 500 });
  }

  await fetch(`${apiUrl}/chat/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ status: 'sent' });
}