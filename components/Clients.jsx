"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { createContext, Fragment, useContext, useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"

export const Context = createContext({ user: {} })

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({})


  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);


  return <Context.Provider value={{ user, setUser }} >
    {children}
    <Toaster />
  </Context.Provider>
}

export const LogoutButton = () => {

  const { user, setUser } = useContext(Context)

  const logOutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout")
      const data = res.json()
      setUser({})
      toast.success("Logged Out Successfully!")
    } catch (error) {

    }
  }
  return (
    <Fragment>
      {
        user._id ?
          <button onClick={logOutHandler} type="" className="btn" >Logout</button>
          : <Link href={"/login"}>Login</Link>
      }
    </Fragment>
  )
}


export const TodoButton = ({ id, completed }) => {
  const router = useRouter();
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PURGE",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };

  const updateHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };
  return (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => updateHandler(id)}
      />
      <button className="btn" onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </>
  );
};

