import React from 'react';
import { useCartPageInit } from './CartPage.init';
import { Navbar } from '../../components/Navbar';
import { CartItem } from '../../components/CartItem';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    cartTotal,
    isPurchasing,
    handleUpdateQuantity,
    handleRemove,
    handlePurchase,
    user,
  } = useCartPageInit();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Shopping Cart</h1>

        {!user ? (
          <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Please log in to view your cart</h3>
            <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-black hover:bg-gray-800 transition-colors">
              Go to Login
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your cart is empty</h3>
            <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-black hover:bg-gray-800 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-6 sm:px-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.product.product_id}>
                      <CartItem
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemove}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-8 bg-gray-50">
              <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                <p>Total Price:</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent rounded-2xl shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                  {isPurchasing ? 'Processing...' : 'Purchase'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
