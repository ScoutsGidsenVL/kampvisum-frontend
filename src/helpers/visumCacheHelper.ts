import { Visum } from '@/serializer/Visum'

const VISUM_DETAIL_CACHE_PREFIX = 'visum-detail-cache:'
const VISUM_DETAIL_TTL_MS = 15 * 60 * 1000

let didHandleReloadCacheInvalidation = false

type CachedVisumDetail = {
  cachedAt: number
  data: Visum
}

const getNavigationType = (): string => {
  if (typeof window === 'undefined' || !window.performance || !window.performance.getEntriesByType) {
    return ''
  }

  const entries = window.performance.getEntriesByType('navigation')
  if (!entries || entries.length === 0) {
    return ''
  }

  const entry = entries[0] as PerformanceNavigationTiming
  return entry.type
}

const normalizeVisumId = (visumId: string): string => {
  return visumId.replace(/\//g, '')
}

const getCacheKey = (groupId: string, visumId: string): string => {
  return `${VISUM_DETAIL_CACHE_PREFIX}${groupId}:${normalizeVisumId(visumId)}`
}

const safeParse = (payload: string): CachedVisumDetail | null => {
  try {
    return JSON.parse(payload) as CachedVisumDetail
  } catch {
    return null
  }
}

const removeExpiredOrInvalidCacheEntry = (key: string) => {
  sessionStorage.removeItem(key)
}

const clearAllVisumDetailCache = () => {
  const keysToRemove: string[] = []
  for (let i = 0; i < sessionStorage.length; i += 1) {
    const key = sessionStorage.key(i)
    if (key && key.startsWith(VISUM_DETAIL_CACHE_PREFIX)) {
      keysToRemove.push(key)
    }
  }

  keysToRemove.forEach((key) => sessionStorage.removeItem(key))
}

// On hard refresh (F5), always start from fresh API data.
export const invalidateVisumDetailCacheOnReload = () => {
  if (didHandleReloadCacheInvalidation) {
    return
  }

  didHandleReloadCacheInvalidation = true
  if (getNavigationType() === 'reload') {
    clearAllVisumDetailCache()
  }
}

export const getCachedVisumDetail = (groupId: string, visumId: string): Visum | null => {
  const key = getCacheKey(groupId, visumId)
  const payload = sessionStorage.getItem(key)
  if (!payload) {
    return null
  }

  const cachedValue = safeParse(payload)
  if (!cachedValue || typeof cachedValue.cachedAt !== 'number') {
    removeExpiredOrInvalidCacheEntry(key)
    return null
  }

  if (Date.now() - cachedValue.cachedAt > VISUM_DETAIL_TTL_MS) {
    removeExpiredOrInvalidCacheEntry(key)
    return null
  }

  return cachedValue.data
}

export const setCachedVisumDetail = (groupId: string, visumId: string, visum: Visum) => {
  const key = getCacheKey(groupId, visumId)
  const payload: CachedVisumDetail = {
    cachedAt: Date.now(),
    data: visum,
  }
  sessionStorage.setItem(key, JSON.stringify(payload))
}

export const clearCachedVisumDetail = (groupId: string, visumId: string) => {
  sessionStorage.removeItem(getCacheKey(groupId, visumId))
}

export const clearCachedVisumDetailsForGroup = (groupId: string) => {
  const prefix = `${VISUM_DETAIL_CACHE_PREFIX}${groupId}:`
  const keysToRemove: string[] = []

  for (let i = 0; i < sessionStorage.length; i += 1) {
    const key = sessionStorage.key(i)
    if (key && key.startsWith(prefix)) {
      keysToRemove.push(key)
    }
  }

  keysToRemove.forEach((key) => sessionStorage.removeItem(key))
}
