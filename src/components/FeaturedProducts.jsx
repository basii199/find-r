import { useState, useEffect } from "react"
import { useGetProductsByCategoryQuery } from "../services/products"
import { getRandomCategory } from "../utils/randomCategory"
import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"

const FeaturedProducts = () => {
  const [category, setCategory] = useState(null)

  useEffect(() => {
    setCategory(getRandomCategory())
  }, [])

  const {
    data: featuredProducts,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(category, {
    skip: !category,
  })

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-lg h-80 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">Failed to load products. Please try again later.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts?.products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="mt-10 text-center">
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          View All Products
        </Link>
        </div>
    </div>
  )
}

export default FeaturedProducts