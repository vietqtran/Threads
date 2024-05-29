'use client'


import { useCallApi } from "@/hooks"
import { useEffect } from "react"

const Test = ()=>{
  
  useEffect(() => {
    const handle = async () => {
      const test = await useCallApi("GET", 'https://jsonplaceholder.typicode.com/todos/1')
      console.log(test)
    }
    handle()
  }, [])

  return <div>
  </div>
}

export default Test