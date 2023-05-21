import { LogoutButton } from '@/components/Clients'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='header' >
      <article>
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
        <LogoutButton />
      </article>
    </div>
  )
}

export default Header
