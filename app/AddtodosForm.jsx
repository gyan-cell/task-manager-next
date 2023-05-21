"use client"

import { Context } from '@/components/Clients'
import { redirect, useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'

const AddtodosForm = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { user } = useContext(Context);


  const router = useRouter();


  const submitHandler = async (e) => {

    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        body: JSON.stringify({
          title,
          description
        }),
        headers: {
          "Content-type": "application/json"
        }

      })
      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("")
    } catch (error) {
      return toast.error(error)
    }

  }


  if (!user._id) return redirect("/login");



  return (
    <div className='login' >
      <section>
        <form onSubmit={submitHandler}  >
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name=""
            placeholder='Task Title'
            value={title} />
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name=""
            placeholder='Task  Description!'
            value={description} />
          <button type="submit">Add Task!</button>
        </form>
      </section>
    </div>
  )
}

export default AddtodosForm
