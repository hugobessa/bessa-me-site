import Server from 'next/server';

export async function GET(req: Request) {
  return Server.NextResponse.json({ message: "OK" })
}