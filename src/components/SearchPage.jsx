import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchProductsQuery } from '../services/products'
import ProductCard from '../components/ProductCard'
import { FiSearch, FiX } from 'react-icons/fi'

const SearchResults = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('q') || ''
  const { data, isLoading, error } = useSearchProductsQuery(query)

  const [searchQuery, setSearchQuery] = React.useState(query)

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative max-w-xl">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >
              <FiSearch className="h-5 w-5" />
            </button>
          </div>
          {query && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                navigate('/products/search')
              }}
              className="absolute right-16 top-2.5 text-gray-500 hover:text-gray-700"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </form>
      </div>

      {query ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Search Results for "{query}"
          </h1>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg mb-4">Failed to load search results</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : data?.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found for "{query}"
              </h3>
              <p className="text-gray-500">
                Try different keywords or browse our categories
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            What are you looking for?
          </h3>
          <p className="text-gray-500">
            Enter a search term to find products
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchResults