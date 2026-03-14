import React from 'react';
import { Product } from '../types/type';
import { Link } from 'react-router-dom';

interface RecommendationCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return <div className="text-gray-500 italic">No recommendations available at this time.</div>;
  }

  return (
    <div className="flex overflow-x-auto space-x-6 pb-6 snap-x scrollbar-hide">
      {products.map((product) => (
        <div key={product.product_id} className="snap-start shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md duration-200">
          <div className="h-40 bg-gray-50 relative">
            <img
              src={product.image_url}
              alt={product.name}
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="text-base font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h4>
            <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
            <div className="mt-auto flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <Link
                to={`/product/${product.product_id}`}
                className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                View
              </Link>
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center justify-center px-3 py-1.5 border border-transparent rounded-lg text-xs font-medium text-white bg-black hover:bg-gray-800 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
