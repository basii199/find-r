import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    thumbnail,
    images,
    availabilityStatus,
  } = product;

  // Calculate discounted price
  const discountedPrice = (price - (price * discountPercentage / 100)).toFixed(2);

  // Determine rating color class
  const getRatingColor = () => {
    if (rating < 3) return 'text-red-600';
    if (rating < 4) return 'text-yellow-500';
    return 'text-green-600';
  };

  // Determine availability color class
  const getAvailabilityColor = () => {
    if (availabilityStatus.toLowerCase().includes('out')) return 'bg-red-100 text-red-800';
    if (availabilityStatus.toLowerCase().includes('stock')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Link to={`/products/${id}`} className="size-full flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-gray-200 hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={thumbnail || images[0]} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Title and Brand */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        
        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{description}</p>
        
        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">${discountedPrice}</span>
          {discountPercentage > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
              <span className="text-sm font-medium text-green-600">{discountPercentage}% off</span>
            </>
          )}
        </div>
        
        {/* Rating and Availability */}
        <div className="flex items-center gap-4 mb-3">
          <span className={`font-bold ${getRatingColor()}`}>
            ★ {rating.toFixed(1)}
          </span>

          <div className="">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getAvailabilityColor()}`}>
              {availabilityStatus}
            </span>
          </div>          
        </div>
        
        
        {/* Add to Cart Button */}
        {/* <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
          Add to Cart
        </button> */}
      </div>
    </Link>
  );
};

export default ProductCard;