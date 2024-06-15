'use client'

import { useTheme } from 'next-themes'

// export const generateMetadata = () => {
//    return {
//       title: 'Dev - Home • Threads',
//       description: 'Home • Threads',
//    }
// }

export default function Home() {
  const { setTheme } = useTheme()

  return (
    <>
      <div className="pl-[100px]">
        <button onClick={() => setTheme('light')}>Light</button>
        <button onClick={() => setTheme('dark')}>Dark</button>
        <button onClick={() => setTheme('system')}>System</button>
      </div>
    </>
  )
}
