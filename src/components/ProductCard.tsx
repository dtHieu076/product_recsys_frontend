import React from 'react';
import { Product } from '../types/type';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md duration-200">
      <div className="aspect-w-4 aspect-h-3 bg-gray-100 relative group">
        <img
          src={product.image_url}
          alt={product.product_name}
          className="object-cover w-full h-48"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-1 line-clamp-2">
          {product.product_name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 font-medium">Brand: {product.brand}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            to={`/product/${product.product_id}`}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            View
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
