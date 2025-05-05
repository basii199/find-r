/* import React from 'react'
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

export default Hero */

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const unsplashImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
];

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Discover Amazing <span className="text-blue-600">Products</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Explore our curated collection of high-quality products. From electronics to fashion, we have everything you need at competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Shop Now
              </Link>
              <Link
                to="/categories"
                className="px-8 py-3 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-square w-full max-w-xl mx-auto rounded-xl shadow-2xl overflow-hidden">
              <Swiper
                modules={[ Autoplay]}
                autoplay={{ delay: 3000 }}
                loop
                className="w-full h-full"
              >
                {unsplashImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${src}?auto=format&fit=crop&w=1099&q=80`}
                      alt={`Slide ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
