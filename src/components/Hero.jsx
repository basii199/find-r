import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='w-full h-screen container grid grid-cols-12 gap-20 p-15 pt-30'>
      <div className='col-span-5 flex flex-col justify-center'>
        <div className='flex flex-col justify-center text-text-dark'>
          <p className='text-7xl'>
            find-r
          </p>
          <p className='text-5xl mt-2'>
            Products Catalog
          </p>

          <p className='mt-5 max-w-md'>
            Explore the largest collection of products powered by DummyJSON — from cutting-edge electronics and stylish clothing to must-have beauty essentials. Whatever you're looking for, we've got you covered. 
          </p>
        </div>

        <Link to={'/products'} className='bg-accent/10 w-fit p-4 px-10 text-xl rounded-lg mt-6 font-semibold text-text-dark/75'>
          View All Products
        </Link>
      </div>

      <div className='col-span-7 h-full bg-primary/5 relative rounded-4xl'>
        <div className='absolute h-[80%] w-[95%] bg-gray-200 top-1/2 -translate-y-1/2 -left-[10%] rounded-xl'>
        </div>
      </div>
    </div>
  )
}

export default Hero