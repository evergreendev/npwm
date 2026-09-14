// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'

const { revalidateTag } = vi.hoisted(() => ({ revalidateTag: vi.fn() }))
vi.mock('next/cache', () => ({ revalidateTag }))

import { GET } from '../../src/app/(frontend)/next/revalidate-hours/route'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.clearAllMocks()
})

describe('hours cache reset', () => {
  it('rejects requests when the cron secret is not configured', async () => {
    vi.stubEnv('CRON_SECRET', '')
    const response = await GET(new Request('https://example.com/next/revalidate-hours'))
    expect(response.status).toBe(401)
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it.each([undefined, 'Bearer wrong-secret'])('rejects invalid authorization: %s', async (authorization) => {
    vi.stubEnv('CRON_SECRET', 'test-secret')
    const response = await GET(new Request('https://example.com/next/revalidate-hours', {
      headers: authorization ? { authorization } : {},
    }))
    expect(response.status).toBe(401)
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('invalidates only hours for an authenticated scheduler request', async () => {
    vi.stubEnv('CRON_SECRET', 'test-secret')
    const response = await GET(new Request('https://example.com/next/revalidate-hours', {
      headers: { authorization: 'Bearer test-secret' },
    }))
    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(revalidateTag).toHaveBeenCalledExactlyOnceWith('hours')
    expect(await response.json()).toEqual({ revalidated: true })
  })
})
