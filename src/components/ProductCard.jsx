import Badge from "./Badge";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image + Badge */}
      <div className="relative h-56 bg-gray-100 flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
        {product.isHot && (
          <div className="absolute top-2 left-2">
            <Badge type="hot">HOT</Badge>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 text-center">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex justify-center mb-2">
          <Rating value={product.ratingValue} count={product.ratingCount} />
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xl font-bold text-[#2998D6]">
            ${product.discountPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm font-medium text-red-600">
            {product.discountPercent}% Off
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
