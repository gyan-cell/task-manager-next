import Link from 'next/link'
import React from 'react'
import "../styles/header.scss"
import { LogoutButton } from './Clients'
const Header= () => {
  return (
    <div className='header' >
      <div>
        <h2>Task Manager</h2>
      </div>
      <article>
        <Link href={"/"} >Home</Link>
        <Link href={"/profile"} >Profile</Link>
        <LogoutButton />
      </article>
    </div>
  )
}

export default Header
