import React from 'react'
import { 
  useGetCategoryListQuery,
  useGetProductsByCategoryQuery,
 } from '../services/products'
import { Link } from 'react-router-dom'

const Categories = () => {
  const { data: categories, isLoading, error } = useGetCategoryListQuery()

  const Thumbnail = ( {category} )=>{
    const {data} = useGetProductsByCategoryQuery(category)
    if(data) {
      const imgUrl = data.products[0].images[0]
      return (
        <div className='w-full h-60'>
          <img src={imgUrl} alt="" />
        </div>
      )
    }
    return (
      <div className='w-full h-60 bg-gray-100 animate-pulse'/>
    )
  }

  //console.log(getThumbnail('beauty'))

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our wide range of product categories to find exactly what you're looking for.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg h-48 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg mb-4">Failed to load categories</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <Link
              key={category}
              to={`${category}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize group-hover:text-blue-600 transition-colors">
                  {category.replace('-', ' ')}
                </h3>
                {/* <div className='w-full h-40 bg-gray-100 animate-pulse'>

                </div> */}
                <Thumbnail category={category} />

                <div className="mt-4 text-blue-600 font-medium flex items-center">
                  View products
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories