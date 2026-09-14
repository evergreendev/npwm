import { revalidateTag } from 'next/cache'

export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET

  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Also invalidates rendered pages that depend on hours, so date selection reruns.
  revalidateTag('hours')

  return Response.json({ revalidated: true }, { headers: { 'Cache-Control': 'no-store' } })
}
