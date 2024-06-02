import React from 'react'
import { auth } from '@/auth'

export default async function page() {
  const user = await auth()
  console.log(user)
  return (
    <div>
      {
        user ? (
          <h1>Welcome {user.user.username}</h1>
        ) : (
          <h1>Not signed in</h1>
        )
      }
    </div>
  )
}