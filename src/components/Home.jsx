/* import React, { useState, useEffect } from 'react'
import Hero from './Hero'
import FeaturedProducts from './FeaturedProducts'
import FeaturedCategories from './FeaturedCategories'

const Home = () => {
  return (
    <div className="pb-20">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
    </div>
  )
}

export default Home */

import React from 'react'
import { Link } from 'react-router-dom'
import Hero from './Hero'
import FeaturedProducts from './FeaturedProducts'
import FeaturedCategories from './FeaturedCategories'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'
import Footer from './Footer'

const Home = () => {
  return (
    <div className="">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home