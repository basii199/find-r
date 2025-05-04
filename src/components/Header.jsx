import { User } from 'lucide-react'
import React from 'react'

const Header = ( {children} ) => {
  return (
    <>
    <nav className='flex fixed top-0 left-0 right-0 z-50 backdrop-blur-md h-15 items-center justify-center bg-primary/10 text-text-dark'>
      <div className='container w-full bg- flex items-center justify-between'>
        <p className='text-xl font-bold'>
          find-r
        </p>

        <div className='flex gap-4'>
          <a href="#features">About</a>
          <a href="#features">Featured</a>
          <a href="#features">Contact</a>
        </div>

        <div className='p-1 rounded-full border'>
          <User />
        </div>
      </div>
    </nav>
    {children}
    </>
  )
}

export default Header