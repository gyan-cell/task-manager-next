"use client"
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Context } from '@/components/Clients'

const page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useContext(Context)

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password
        }),
        headers: {
          "Content-type": "application/json",
        }
      })
      const data = await res.json()
      if (!data.success) return toast.error(data.message)
      if (data.success) {
        toast.success(data.message)
        setUser(data.user)
      }
      console.log(data)
    }
    catch (error) {
      return  toast.error(error)
    }

  }

  if (user._id) return redirect("/")

  return (
    <div className='login' >
      <section>
        <form onSubmit={submitHandler} >
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder='Enter Name'

          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Enter Email'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name=""
            placeholder='Enter Password'
            value={password}
          />
          <Link href={"login"} >Already a Member? </Link>
          <button type="submit">Sign Up!</button>
        </form>
      </section>
    </div>
  )
}

export default page
