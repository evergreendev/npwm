import type { ClosedForSeason } from '@/payload-types'
import { getCachedGlobal } from './getGlobals'

export const getSeasonClosure = async (): Promise<ClosedForSeason> =>
  getCachedGlobal('closed-for-season')()
