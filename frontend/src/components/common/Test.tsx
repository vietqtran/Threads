'use client'

import { API_METHOD } from '@/constants/api-methods'
import { useCallApi } from '@/hooks'
import { useEffect } from 'react'

const Test = () => {
  useEffect(() => {
    const handle = async () => {
      const method = API_METHOD.GET
      const url = 'https://jsonplaceholder.typicode.com/todos/2'
      const test = await useCallApi<{ id: number }>(method, url)
      console.log(test as { id: number })
    }
    handle()
  }, [])

  return <div></div>
}

export default Test
