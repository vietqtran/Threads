'use client'

import { API_METHOD } from '@/constants/api-methods'
import { useCallApi } from '@/hooks'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { auth, googleProvider } from '@/utils/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

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

  const handleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        console.log(credential)
        // The signed-in user info.
        const user = result.user
        console.log(user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  )
}

export default Test
