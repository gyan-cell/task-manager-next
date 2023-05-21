"use client"

import { Context } from '@/components/Clients'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { toast } from "react-hot-toast";


const page = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useContext(Context)

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
        const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      if (data.success) {
        setUser(data.user)
        toast.success(data.message)    
      }
    } catch (error) {
      toast.error(error)
    }
  }

  if (user._id) return redirect("/")
  return (
    <div className='login' >
      <section>
        <form onSubmit={loginHandler} >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Enter Email' />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name=""
            placeholder='Enter Password'
            value={password} />
          <Link href={"register"} >New User </Link>
          <button type="submit">Login</button>
        </form>
      </section>
    </div>
  )
}

export default page
