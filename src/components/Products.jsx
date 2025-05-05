import React from 'react'
import ProductCard from './ProductCard'
import { 
  useGetProductsQuery,
  useGetCategoryListQuery,
  useGetProductsByCategoryQuery
} from '../services/products'
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const PAGE_SIZE = 12 // Number of products per page

const Products = () => {  
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedCategories, setSelectedCategories] = React.useState([])
  const [sortOption, setSortOption] = React.useState('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)

  // Calculate skip value for pagination
  const skip = (currentPage - 1) * PAGE_SIZE

  // Fetch all products or products by category
  const { 
    data: allProductsData, 
    error: allProductsError, 
    isLoading: allProductsLoading 
  } = useGetProductsQuery({ limit: PAGE_SIZE, skip }, {
    skip: selectedCategories.length > 0 // Skip if categories are selected
  })

  // Fetch products by category if any category is selected
  const { 
    data: categoryProductsData,
    error: categoryProductsError,
    isLoading: categoryProductsLoading
  } = useGetProductsByCategoryQuery(selectedCategories[0], {
    skip: selectedCategories.length !== 1 // Only fetch when exactly one category is selected
  })

  // Get category list for sidebar
  const { 
    data: categoriesData, 
    error: categoriesError, 
    isLoading: categoriesLoading 
  } = useGetCategoryListQuery()

  // Determine which products to display
  const productsToDisplay = React.useMemo(() => {
    if (selectedCategories.length === 1) {
      return categoryProductsData?.products || []
    }
    return allProductsData?.products || []
  }, [selectedCategories, allProductsData, categoryProductsData])

  // Calculate total products count for pagination
  const totalProducts = React.useMemo(() => {
    if (selectedCategories.length === 1) {
      return categoryProductsData?.total || 0
    }
    return allProductsData?.total || 0
  }, [selectedCategories, allProductsData, categoryProductsData])

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE)

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [category] // Only allow one category at a time for API fetching
    )
    setCurrentPage(1) // Reset to first page when changing category
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isLoading = selectedCategories.length > 0 
    ? categoryProductsLoading 
    : allProductsLoading

  const error = selectedCategories.length > 0 
    ? categoryProductsError 
    : allProductsError

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-red-500 text-xl mb-4">
          Failed to load products
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-60 lg:hidden pt-15">
          <div className="fixed inset-0 bg-black/15" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 border-t border-gray-200 px-4 py-6">
              <h3 className="-mx-2 -my-3 flow-root">
                <span className="font-medium text-gray-900">Categories</span>
              </h3>
              <div className="pt-6">
                <div className="space-y-6">
                  {categoriesData?.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`filter-mobile-${category}`}
                        name={`category[]`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`filter-mobile-${category}`}
                        className="ml-3 text-sm text-gray-600 capitalize"
                      >
                        {category.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* here */}
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between pt-8 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {selectedCategories.length ? 
              `${selectedCategories[0].replace('-', ' ')}` : 
              'All Products'}
          </h1>

          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  Filters
                  <FiChevronDown
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </button>
              </div>
            </div>

            <div className="ml-4">
              <label htmlFor="sort" className="sr-only">Sort</label>
              <select
                id="sort"
                name="sort"
                className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Categories sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-20 h-dvh overflow-y-auto">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Categoriesx</h2>
              
              {categoriesLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : categoriesError ? (
                <p className="text-red-500 text-sm">Error loading categories</p>
              ) : (
                <div className="space-y-3">
                  {categoriesData?.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`filter-${category}`}
                        name={`category[]`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`filter-${category}`}
                        className="ml-3 text-sm text-gray-600 capitalize"
                      >
                        <Link 
                          to={`/category/${category}`} 
                          className="hover:text-blue-600 hover:underline"
                        >
                          {category.replace('-', ' ')}
                        </Link>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {selectedCategories.length > 0 && (
                <button
                  onClick={resetFilters}
                  className="mt-6 text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(PAGE_SIZE)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                {productsToDisplay.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {productsToDisplay.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-gray-200 mt-8 pt-6">
                      <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(skip) + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(skip + PAGE_SIZE, totalProducts)}
                        </span>{' '}
                        of <span className="font-medium">{totalProducts}</span> results
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum
                          if (totalPages <= 5) {
                            pageNum = i + 1
                          } else if (currentPage <= 3) {
                            pageNum = i + 1
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i
                          } else {
                            pageNum = currentPage - 2 + i
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                currentPage === pageNum
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          )
                        })}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your filters or search for something else
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products