import React from 'react';
import { useRecommendedPageInit } from './RecommendedPage.init';
import { Navbar } from '../../components/Navbar';
import { RecommendationCarousel } from '../../components/RecommendationCarousel';
import { Link } from 'react-router-dom';

export const RecommendedPage: React.FC = () => {
  const { recommendations, isLoading, error, user, handleAddCart } = useRecommendedPageInit();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Recommended Products</h1>
          <p className="mt-3 text-lg text-gray-500">Machine Learning Test Output</p>
        </div>

        {!user ? (
          <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Please log in to see recommendations</h3>
            <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-black hover:bg-gray-800 transition-colors">
              Go to Login
            </Link>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No recommendations found for your profile yet.
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <RecommendationCarousel products={recommendations} onAddToCart={handleAddCart} />
          </div>
        )}
      </main>
    </div>
  );
};
