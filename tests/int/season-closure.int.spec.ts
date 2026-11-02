// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'

const { getSeasonClosure, getHours, revalidateTag } = vi.hoisted(() => ({
  getSeasonClosure: vi.fn(),
  getHours: vi.fn(),
  revalidateTag: vi.fn(),
}))
vi.mock('@/utilities/getSeasonClosure', () => ({ getSeasonClosure }))
vi.mock('@/utilities/getHours', () => ({ getHours }))
vi.mock('@/components/RichText', () => ({ default: () => null }))
vi.mock('next/cache', () => ({ revalidateTag }))

import { Hours } from '../../src/components/Hours'
import { ClosedForSeason } from '../../src/ClosedForSeason/config'

beforeEach(() => vi.clearAllMocks())

describe('season closure', () => {
  it.each(['current', 'all'] as const)('replaces %s hours without requiring a schedule', async (mode) => {
    getSeasonClosure.mockResolvedValue({ closedForSeason: true, message: 'See you next spring!\nThank you.' })
    const markup = renderToStaticMarkup(await Hours({ mode, className: 'custom-hours' }))
    expect(markup).toContain('See you next spring!\nThank you.')
    expect(markup).toContain('whitespace-pre-line')
    expect(markup).toContain('custom-hours')
    expect(getHours).not.toHaveBeenCalled()
  })

  it('returns to the regular schedule when disabled', async () => {
    getSeasonClosure.mockResolvedValue({ closedForSeason: false, message: 'Closed' })
    getHours.mockResolvedValue([])
    expect(await Hours({})).toBeNull()
    expect(getHours).toHaveBeenCalledOnce()
  })

  it('invalidates the closure cache on save and respects disabled revalidation', () => {
    const hook = ClosedForSeason.hooks!.afterChange![0]
    const args = { doc: { closedForSeason: true }, req: { context: {} } }
    hook(args as Parameters<typeof hook>[0])
    expect(revalidateTag).toHaveBeenCalledExactlyOnceWith('global_closed-for-season')
    revalidateTag.mockClear()
    hook({ ...args, req: { context: { disableRevalidate: true } } } as unknown as Parameters<typeof hook>[0])
    expect(revalidateTag).not.toHaveBeenCalled()
  })
})
