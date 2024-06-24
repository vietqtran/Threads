import { useEffect, useRef } from 'react'

export const useClickOutside = (handle: () => void) => {
  const ref = useRef<any>(null)
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref?.current && !ref.current.contains(event.target)) {
        handle()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [handle])

  return ref
}
