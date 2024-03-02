import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

/**
 * @template {string} Q
 * @template D
 * @typedef {Object} FetcherOptions
 * @property {(query: Q, data: D) => void} [onLoad]
 * @property {(error: unknown) => void} [onError]
 */
/**
 * @template {string} Q
 * @template D
 * @param {Q} query 
 * @param {(query: Q) => Promise<D>} fetcher 
 * @param {FetcherOptions<Q, D>} [options]
 * @returns {{ isLoading: boolean, error: unknown, data: D | null, mutate: () => void }}
 */
export const useFetcher = (query, fetcher, options = {}) => {
  const { onLoad, onError } = options
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const fetcherRef = useRef(fetcher)
  const onLoadRef = useRef(onLoad)
  const onErrorRef = useRef(onError)
  useEffect(() => {
    fetcherRef.current = fetcher
    onLoadRef.current = onLoad
    onErrorRef.current = onError
  }, [fetcher, onLoad, onError])
  useEffect(() => {
    let cancel = false
    const fetchData = () => {
      setLoading(true)
      fetcherRef.current(query)
        .then(data => {
          if (cancel) return
          setData(data)
          setError(null)
          onLoadRef.current?.(query, data)
        })
        .catch(error => {
          if (cancel) return
          setError(error)
          onErrorRef.current?.(error)
        })
        .finally(() => {
          if (cancel) return
          setLoading(false)
        })
    }
    fetchData()
    return () => {
      cancel = true
    }
  }, [query])
  const mutate = useCallback(() => {
    setLoading(true)
    fetcherRef.current(query)
      .then(data => {
        setError(null)
        setData(data)
        onLoadRef.current?.(query, data)
      })
      .catch(error => {
        setError(error)
        onErrorRef.current?.(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [query])
  return useMemo(() => ({ isLoading, error, data, mutate }), [isLoading, error, data, mutate])
}