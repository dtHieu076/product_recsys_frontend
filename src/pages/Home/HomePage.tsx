import React from 'react';
import { useHomePageInit } from './HomePage.init';
import { ProductGrid } from '../../components/ProductGrid';
import { Navbar } from '../../components/Navbar';

export const HomePage: React.FC = () => {
  const { products, isLoading, error, handleAddCart } = useHomePageInit();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Featured Products</h1>
          <p className="mt-2 text-sm text-gray-500">Discover our latest collection of premium items.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        ) : (
          <ProductGrid products={products} onAddToCart={handleAddCart} />
        )}
      </main>
    </div>
  );
};
