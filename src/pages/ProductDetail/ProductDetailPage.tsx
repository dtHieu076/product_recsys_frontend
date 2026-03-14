import React from 'react';
import { useProductDetailPageInit } from './ProductDetailPage.init';
import { Navbar } from '../../components/Navbar';
import { RecommendationCarousel } from '../../components/RecommendationCarousel';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductDetailPage: React.FC = () => {
  const { product, recommendations, isLoading, error, handleAddCart, handleBuyNow } = useProductDetailPageInit();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : error || !product ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error || 'Product not found'}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 lg:aspect-none lg:h-full">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-500 font-medium mb-6">by {product.brand}</p>

                <div className="mb-8">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>

                <div className="mb-8">
                  <h3 className="sr-only">Description</h3>
                  <div className="text-base text-gray-700 space-y-6 leading-relaxed">
                    <p>{product.description}</p>
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAddCart(product)}
                    className="flex-1 bg-blue-600 border border-transparent rounded-2xl py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-black border border-transparent rounded-2xl py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && product && recommendations.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">ML Recommended Products</h2>
            <RecommendationCarousel products={recommendations} onAddToCart={handleAddCart} />
          </div>
        )}
      </main>
    </div>
  );
};
