import { useState } from 'react';
import ProductCard from './ProductCard'; // Our previous component
import { useGetProductsByCategoryQuery } from '../services/products';

const ProductPage = ({ product }) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    images,
    category,
    tags,
    dimensions,
    weight,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    reviews
  } = product;

  console.log( product);

  // Calculate discounted price
  const discountedPrice = (price - (price * discountPercentage / 100)).toFixed(2);
  const {data, error, isLoading, refetch} = useGetProductsByCategoryQuery(product.category);

  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <a href="/products" className="text-sm text-gray-700 hover:text-blue-600">Home</a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <a href={`/products/category/${category}`} className="text-sm text-gray-700 hover:text-blue-600 ml-1">{category}</a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-500 ml-1">{title}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Gallery */}
        <div className="md:w-1/2">
          <div className="sticky top-4">
            <div className="rounded-lg overflow-hidden mb-4 bg-gray-100 aspect-square">
              <img 
                src={mainImage} 
                alt={title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button key={index} onClick={()=>{setMainImage(img); console.log(img)}} className="aspect-square bg-gray-100 rounded overflow-hidden border-2 border-transparent hover:border-blue-500 shadow-sm">
                  <img src={img} alt={`${title} ${index + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 text-sm">Brand: <span className="font-medium">{brand}</span></span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-600 text-sm">SKU: {product.sku}</span>
          </div>

          <div className="flex items-center mb-6">
            <div className={`flex items-center px-2 py-1 rounded-md ${rating < 3 ? 'bg-red-100 text-red-800' : rating < 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
              <span className="font-bold mr-1">★ {rating.toFixed(1)}</span>
              <span className="text-sm">({reviews.length} reviews)</span>
            </div>
            <span className="mx-4 text-gray-300">|</span>
            <span className={`text-sm font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock > 0 ? `${stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-gray-900">${discountedPrice}</span>
              {discountPercentage > 0 && (
                <>
                  <span className="text-lg text-gray-500 line-through">${price.toFixed(2)}</span>
                  <span className="text-sm font-medium bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                    Save {discountPercentage}%
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500">+ ${(5.99).toFixed(2)} shipping</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700">{description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Shipping</h4>
              <p className="text-sm text-gray-700">{shippingInformation}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Returns</h4>
              <p className="text-sm text-gray-700">{returnPolicy}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Warranty</h4>
              <p className="text-sm text-gray-700">{warrantyInformation}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Dimensions</h4>
              <p className="text-sm text-gray-700">{dimensions.width} x {dimensions.height} x {dimensions.depth} cm</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Rating</h3>
            <div className="flex items-center mb-2">
              <div className="text-4xl font-bold mr-4">{rating.toFixed(1)}</div>
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-2xl ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{reviews.length} reviews</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Leave a Review</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" className="text-2xl text-gray-300 hover:text-yellow-400 focus:outline-none">
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                <textarea
                  id="comment"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Share your thoughts about this product..."
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <h4 className="font-medium text-gray-900">{review.reviewerName}</h4>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div> */}
      </div>

      {/* Related Products */}
      {/* <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
        </div>
      </div> */}
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
        
        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg h-96 animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load related products</p>
            <button 
              onClick={() => refetch()} 
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Retry
            </button>
          </div>
        )}

        {/* Success state */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.products
              .filter(p => p.id !== product.id) // Exclude current product
              .slice(0, 4) // Show max 4 related products
              .map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                />
              ))
            }
          </div>
        )}

        {/* Empty state */}
        {data?.products?.length <= 1 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No related products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;