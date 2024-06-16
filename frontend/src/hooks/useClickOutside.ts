import { useEffect, useRef } from 'react'

export const useClickOutside = (handle: () => void) => {
  const ref = useRef<any>(null)
  console.log('mounted use click outside')
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref?.current && !ref.current.contains(event.target)) {
        console.log('clicked outside')
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
