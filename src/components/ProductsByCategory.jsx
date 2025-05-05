import React from 'react';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../services/products';
import { FiFilter, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

const ProductsByCategory = () => {  
  const { category } = useParams();
  const { data, error, isLoading, isFetching } = useGetProductsByCategoryQuery(category);
  const [showFilters, setShowFilters] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = React.useState([]);
  const [sortOption, setSortOption] = React.useState('featured');

  // Extract unique brands from products
  const brands = React.useMemo(() => {
    if (!data?.products) return [];
    return [...new Set(data.products.map(product => product.brand))];
  }, [data]);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    if (!data?.products) return [];
    
    let result = [...data.products];
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Apply price filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'rating':
        return result.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return result.sort(
          (a, b) => new Date(b.meta?.createdAt) - new Date(a.meta?.createdAt)
        );
      default:
        return result;
    }
  }, [data, selectedBrands, priceRange, sortOption]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  if (error) {
    return (
      <div className="col-span-12 flex flex-col items-center justify-center py-20">
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
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2">
          {category.replace('-', ' ')}
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} products available
        </p>
      </div>

      {/* Filters and Sorting Bar */}
      <div className="flex flex-col md:flex-row justify-end md:items-center mb-6 gap-4">

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {(isLoading || isFetching) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg h-80 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isFetching && (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products match your filters
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search for something else
              </p>
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setPriceRange([0, 1000]);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Pagination would go here */}
    </div>
  );
};

export default ProductsByCategory;